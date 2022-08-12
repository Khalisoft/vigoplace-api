import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm"
import {Exclude} from 'class-transformer'
@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    messageId: number

    @Column()
    messageBody: string

    @Column()
    sender: number
    
    @Column()
    receiver: number
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}   
