import { DynamicPropertiesDefinition, EntityType, world } from "@minecraft/server"

interface wVkey {key: string, type:'boolean' | 'number' | 'string'}
interface enVkey {key: string, type:'boolean' | 'number' | 'string', entity: EntityType}

class Database {

    /*** 월드 변수*/
    public worldV: wVkey[] = [];
    /**엔티티 변수 */
    public entityV: enVkey[] = [];

    constructor() {
        world.events.worldInitialize.subscribe((e)=>{
            //worldV register
            const wV = new DynamicPropertiesDefinition()
            this.worldV.forEach((v)=>{
               
                if(v.type=="boolean") wV.defineBoolean(v.key)
                if(v.type=="number") wV.defineNumber(v.key)
                if(v.type=="string") wV.defineString(v.key,400)

            })
            //entityV register
            this.entityV.forEach((v)=>{
                const enV = new DynamicPropertiesDefinition()
                if(v.type=="boolean") enV.defineBoolean(v.key)
                if(v.type=="number") enV.defineNumber(v.key)
                if(v.type=="string") enV.defineString(v.key,400)
                e.propertyRegistry.registerEntityTypeDynamicProperties(enV,v.entity)
            })
            
            e.propertyRegistry.registerWorldDynamicProperties(wV)
        })
    }

    /**
     * 월드 변수를 등록합니다.
     * @param key 변수 이름
     * @param type 변수 유형
     */
    addWorldV(key:string, type:'boolean' | 'number' | 'string') {
        const v: wVkey = {key:key,type:type}
        this.worldV.push(v)
    }

    /**
     * 엔티티별 변수를 등록합니다.
     * @param key 변수 이름
     * @param type 변수 유형
     * @param entity 엔티티 타입
     */
    addEntityV(key:string, type:'boolean' | 'number' | 'string', entity: EntityType) {
        const v: enVkey = {key:key,type:type,entity:entity}
        this.entityV.push(v)
    }
}
/** 
 * 월드의 데이터베이스
 */
export const database = new Database()