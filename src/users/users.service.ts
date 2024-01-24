import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "name1 name1",
            "email": "email1@.email.com",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "name2 name2",
            "email": "email2@.email.com",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "name3 name3",
            "email": "email3@.email.com",
            "role": "INTERN",
        },
        {
            "id": 4,
            "name": "name4 name4",
            "email": "email4@.email.com",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "name5 name5",
            "email": "email5@.email.com",
            "role": "ADMIN",
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User role not found!')

            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) throw new NotFoundException('User not found!')

        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user

        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
