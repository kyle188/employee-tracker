import inquirer from 'inquirer'
import mysql from 'mysql2'
import cTable from 'console.table'
import { Console } from 'console'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees_db'
})

connection.connect(function(err){
    if (err) throw err;
    mainMenu();
})

function mainMenu() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome to our employee database! What would you like to do?',
            choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update employee role'
                    ]
            }).then(function (answer) {
                switch (answer.action) {
                    case 'View all departments':
                        viewDepartments();
                        break;
                    case 'View all roles':
                        viewRoles();
                        break;
                    case 'View all employees':
                        viewEmployees();
                        break;
                    case 'Add a department':
                        addDepartment();
                        break;
                    case 'Add a role':
                        addRole();
                        break;
                    case 'Add an employee':
                        addEmployee();
                        break;
                    case 'Update employee role':
                        updateRole();
                        break;
                    default:
                        break;
                }
        })
};


function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        mainMenu();
    })
};

function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        mainMenu();
    })
};

function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res); 
        mainMenu();
    })
};

function addDepartment() {
    inquirer
    .prompt([
        {
            name: 'newDepartment', 
            type: 'input', 
            message: 'Please enter name of new department'
        }
    ]).then(function (answer) {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: answer.newDepartment
            });
            var query = 'SELECT * FROM department';
            connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('New department added!');
                console.table('All Departments:', res);
                mainMenu();
            })
        })
    };
    
    function addRole() {
        connection.query('SELECT * FROM department', function(err, res) {
            if (err) throw err;
            
            inquirer 
            .prompt([
                {
                    name: 'new_role',
                    type: 'input', 
                    message: "Please enter name of new role"
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Please enter salary of new role'
                },
                {
                    name: 'Department',
                    type: 'list',
                    choices: function() {
                        var deptArry = [];
                        for (let i = 0; i < res.length; i++) {
                            deptArry.push(res[i].name);
                        }
                        return deptArry;
                    },
                }
            ]).then(function (answer) {
                let department_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].name == answer.Department) {
                        department_id = res[a].id;
                    }
                }
                
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.new_role,
                        salary: answer.salary,
                        department_id: department_id
                    },
                    function (err, res) {
                        if(err)throw err;
                        console.log('New role added!');
                        console.table('All Roles:', res);
                        mainMenu();
                    })
                })
            })
        };

        function addEmployee() {
            connection.query('SELECT * FROM role', function (err, res) {
                if (err) throw err;
                inquirer
                    .prompt([
                        {
                            name: 'first_name',
                            type: 'input', 
                            message: "Please enter employee's first name ",
                        },
                        {
                            name: 'last_name',
                            type: 'input', 
                            message: "Please enter employee's last name? "
                        },
                        {
                            name: 'manager_id',
                            type: 'input', 
                            message: "Please enter employee's manager's ID? "
                        },
                        {
                            name: 'role', 
                            type: 'list',
                            choices: function() {
                            var roleArray = [];
                            for (let i = 0; i < res.length; i++) {
                                roleArray.push(res[i].title);
                            }
                            return roleArray;
                            },
                            message: "Please enter employee role "
                        }
                        ]).then(function (answer) {
                            let role_id;
                            for (let a = 0; a < res.length; a++) {
                                if (res[a].title == answer.role) {
                                    role_id = res[a].id;
                                    console.log(role_id)
                                }                  
                            }  
                            connection.query(
                            'INSERT INTO employee SET ?',
                            {
                                first_name: answer.first_name,
                                last_name: answer.last_name,
                                manager_id: answer.manager_id,
                                role_id: role_id,
                            },
                            function (err) {
                                if (err) throw err;
                                console.log('Employee been added!');
                                mainMenu();
                            })
                        })
                })
        };

        //Update Role