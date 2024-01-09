/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoAbility, createMongoAbility, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';

enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<MongoAbility>(createMongoAbility);

        if (user.role.name === 'admin') {
            can(Action.Manage, 'all');
        } else {

            can(Action.Read, 'all');
        }

        if (user.role.name === 'user') {
            can(Action.Read, 'Phone', { user_id: user.id });
            can(Action.Update, 'Phone', { user_id: user.id });
            cannot(Action.Delete, 'Phone', {user_id: user.id});
        }

        return build();
    }
}