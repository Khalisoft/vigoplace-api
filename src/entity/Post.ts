import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm"
import {Exclude} from 'class-transformer'
@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    postId: number

    @Column()
    postTitle: string

    @Column()
    postBody: string

    @Column()
    postImage: string

    @Column()
    poster: number
    
    @Column("int",{array: true, default: []})
    likes: number[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}   
