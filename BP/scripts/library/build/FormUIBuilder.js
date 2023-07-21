import { MinecraftEntityTypes, system, world } from "@minecraft/server";
import { database } from "./databaseBuilder";
;
;
;
// Form Variable
database.addEntityV('Form', 'number', MinecraftEntityTypes.player);
class FormData {
    constructor() {
        /** Form List */
        this.forms = [];
        system.runInterval(() => {
            world.getAllPlayers().forEach(pl => {
                //get each variable
                const FormNum = pl.getDynamicProperty('Form');
                const FormPromise = this.forms[FormNum];
                //form show
                if (FormNum !== -1)
                    FormPromise.form.show(pl)
                        .then((r) => FormPromise.then(r));
                //form reset
                pl.setDynamicProperty('Form', -1);
            });
        });
    }
    /**
     * FormData에 Form을 추가합니다.
     * @param FormType 추가할 Form의 타입
     * @param Form 추가할 Form
     * @param then Form을 열었을 때 플레이어의 반응에 이어지는 동작(action)
     */
    addForm(FormType, Form, then) {
        this.forms.push({
            type: FormType,
            form: Form,
            then: then
        });
    }
    /**
     * 지정된 플레이어에게 Form UI를 보여줍니다.
     * @param form formUI
     * @param player 플레이어
     */
    show(form, player) {
        const formNum = this.forms.findIndex(v => v.form == form);
        player.setDynamicProperty('Form', formNum);
    }
}
/**
 * Form UI 핸들링
 */
export const FormUI = new FormData();
