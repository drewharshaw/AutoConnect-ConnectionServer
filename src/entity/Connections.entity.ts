import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('Connections')
export class Connections extends BaseEntity {

    @PrimaryGeneratedColumn()
    ConnectId: number;

    @Column()
    AlphaId: number;

    @Column()
    BetaJSON: string;
}
