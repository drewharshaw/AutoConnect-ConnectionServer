import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('AutoModels')
export class AutosModels extends BaseEntity {
  // foreign key to Autos.ModelId
  @PrimaryGeneratedColumn()
  ModelId: number;

  @Column('decimal')
  Radius: number;

  //TODO: Add manufacturer & year
}
