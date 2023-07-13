import { uuidMapAssertGet } from "../collections/idCollections"
import { CharacterRigJointName } from "../interface/ICharacterRig"
import ICharacterRigJoint, {
    characterRigJointDefaults,
    characterRigJointSchema
} from "../interface/ICharacterRigJoint"
import CharacterRig from "./CharacterRig"
import FoundManager from "./core/FoundManager"
import GimbalObjectManager from "./core/GimbalObjectManager"
import Cube from "./primitives/Cube"
import Sphere from "./primitives/Sphere"

export default class CharacterRigJoint
    extends GimbalObjectManager
    implements ICharacterRigJoint
{
    public static componentName = "characterRigJoint"
    public static defaults = characterRigJointDefaults
    public static schema = characterRigJointSchema

    public boneManager!: FoundManager
    private characterRig!: CharacterRig

    public constructor() {
        super()
        this.$disableSerialize = true
        this.scale = 0.05

        const jointSrc = new Sphere()
        jointSrc.$ghost()
        this.append(jointSrc)
        jointSrc.depthTest = false
        jointSrc.opacity = 0.5

        const jointDest = new Cube()
        jointDest.$ghost()
        this.append(jointDest)
        jointDest.y = -150
        jointDest.scale = 0.2
        jointDest.depthTest = false
        jointDest.opacity = 0.5
    }

    public $init(characterRig: CharacterRig, name: CharacterRigJointName) {
        this.characterRig = characterRig
        this.name = name
        characterRig.append(this)
        this.boneManager = uuidMapAssertGet(characterRig[name] as string)
        this.placeAt(this.boneManager.getWorldPosition())
        return this
    }

    public $attachBone() {
        this.boneManager.$disableSerialize = false
        this.boneManager.characterRig = this.characterRig
        this.$innerObject.attach(this.boneManager.$object)
    }
}
