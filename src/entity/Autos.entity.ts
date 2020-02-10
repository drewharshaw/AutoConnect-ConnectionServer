import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AutosModels } from './AutoModels.entity';

/**
 * Things to Note:
 * NOT NULL constraints are on by default, can be changed with nullable:true
 */

@Entity('Autos')
export class Autos extends BaseEntity {
  @PrimaryGeneratedColumn()
  AutoId: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  PositionX: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  PositionY: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  DestinationX: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  DestinationY: number;

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  Speed: number;

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  Direction: number;

  @Column({ type: 'varchar', length: 100, nullable: true }) // TODO: add datetime type later
  Time: string;

  @Column({ type: 'bit', nullable: true, default: 0 })
  Terminated: number;

  // TODO: add @CreateDateColumn to track insert time

  @Column({ type: 'nvarchar', length: 1000 })
  RouteXML: string;

  // foreign key to AutoModels.ModelId
  @OneToOne(() => AutosModels, model => model.ModelId)
  @JoinColumn()
  ModelId: AutosModels;
}
