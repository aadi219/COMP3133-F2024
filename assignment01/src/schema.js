import bcrypt from 'bcrypt';
import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import User from "./models/Users.js";
import Employee from "./models/Employee.js";


const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

const employeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        designation: { type: GraphQLString },
        department: { type: GraphQLString },
        salary: { type: GraphQLFloat},
        employee_photo: { type: GraphQLString },
        date_of_joining: { type: GraphQLString},
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString }
    })
});

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: userType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const user = await User.findOne({ 
                    username: args.username,
                });
                if (!user) throw new Error('User not found');
                const validPassword = await bcrypt.compare(args.password, user.password);
                if (!validPassword) throw new Error('Invalid Credentials');
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email
                } 
            }
        },
        getAllEmployees: {
            type: new GraphQLList(employeeType),
            async resolve(parent, args) {
                return await Employee.find();
            }
        },
        getEmployeeById: {
            type: employeeType,
            args: {
                id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await Employee.findById(args.id);
            }
        },
        getEmployeeByDesignationOrDepartment: {
            type: new GraphQLList(employeeType),
            args: {
                designation: { type: GraphQLString },
                department: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await Employee.find({
                    $or: [
                        { designation: args.designation },
                        { department: args.department }
                    ]
                });
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: userType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: await bcrypt.hash(args.password, 10)
                });
                await user.save();
                return {
                    id: user.id,
                }
            }
        },
        addEmployee: {
            type: employeeType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                designation: { type: GraphQLString },
                department: { type: GraphQLString },
                salary: { type: GraphQLFloat},
                employee_photo: { type: GraphQLString },
                date_of_joining: { type: GraphQLString},
            },
            async resolve(parent, args) {
                const employee = new Employee({...args});
                return await employee.save();
            }
        },
        updateEmployee: {
            type: employeeType,
            args: {
                id: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                designation: { type: GraphQLString },
                department: { type: GraphQLString },
                salary: { type: GraphQLFloat},
                employee_photo: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return await Employee.findByIdAndUpdate(args.id, {...args}, { new: true });
            }
        },
        deleteEmployee: {
            type: employeeType,
            args: {
                id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await Employee.findByIdAndDelete(args.id);
            }
        }
    }
});

export default new GraphQLSchema({query: rootQuery, mutation: mutation});