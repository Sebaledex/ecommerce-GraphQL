import { Resolver, Query, Mutation, Args, Int,  ResolveReference} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

//Aca iran todas las query y mutaciones 
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  //Para poder usar el usuario en otros microservicios
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): User {
    return this.usersService.findOne(reference.id);
  }
}
