import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Autos } from "./Autos.entity";

@Entity('AutoModels')
export class AutosModels extends BaseEntity {

    // foreign key to Autos.ModelId
    @PrimaryGeneratedColumn()
    ModelId: number;
 
    @Column('decimal')
    Radius: number;

    //Come back add manufacturer & year
}