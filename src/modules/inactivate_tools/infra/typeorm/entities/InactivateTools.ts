
import ToolingControl from '@modules/tooling_control/infra/typeorm/entities/ToolingControl';


import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity('inactivate_tools')
export default class InactivateTools {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @JoinColumn({ name: 'id_tooling_control' })
    @ManyToOne(() => ToolingControl, (tooling_control) => tooling_control.id)
    tooling_control: ToolingControl;

    @Column()
    id_tooling_control: number;

    @Column()
    reason_tool_inactivation: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
