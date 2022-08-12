import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm"
import {Exclude} from 'class-transformer'
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column({unique: true})
    username: string
    
    @Exclude()
    @Column()
    password: string

    @Column("int",{array: true, default: []})
    followers: number[]
    
    @Column("int",{array: true, default: []})
    following: number[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}   
