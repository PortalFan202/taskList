const util = require ("util")
//Create task
class TaskList{
    tasks;
    //Make it so it makes an array when created
    constructor(){
        this.tasks = new Array
    }
    //Create methods
    //Create method that print the contents of the list by looping trough the tasks array
    print(){
        console.log("This is the list of tasks:")
        //When printing the elements, we also print the index to show wich task it is, we add one to the index so it starts from 1
        this.tasks.forEach((element, index) => process.stdout.write((index+1)+".- "+element))  
    }
    //Create method that adds a task by pushing an input into the array
    add(task){
        this.tasks.push(task)
    }
    //Create method that removes a task by splicing it from the array in a given index
    remove(index){
        //The task gets deleted based on the index given minus one since the list displayed starts at 1
        this.tasks.splice(index-1, 1)
    }
}
//We make a function that'll print the menu
function printMenu(){
    process.stdout.write("\n1 - Add task\n2 - Remove Task\n3 - Print List\n0 - Quit\n\n")
}
//We make a new list for the tasks
let taskList = new TaskList
//We make some variables that we'll use later
let askForTask;
let askForRemoval;
//We make a UI for the user
process.stdout.write("Hi! Please choose one of these options:\n")
printMenu()
//We take user input
process.stdin.on("data", function(userInput){
    //If any of these two variables is true, the code will ask for different numbers, so to avoid conflict we will run an if else
    if(askForTask==true || askForRemoval==true){
        switch(true){
            //If the variable that is set to "true" when 1 is selected is true, run this code  
            case(askForTask==true):
                taskList.add(userInput)
                askForTask=false
                printMenu()
                break;
            //If the variable that is set to "true" when 2 is selected is true, run this code  
            case(askForRemoval==true):
                taskList.remove(userInput)
                askForRemoval=false
                process.stdout.write(util.format("Task %d deleted.", userInput))
                printMenu()
                break;
        }
    //So, if askForAsk or askForRemoval are not true, we can run the code normally
    } else {
        switch(true){
            //If the input is 0, terminate process
            case(userInput==0):
                process.exit()
            //If the input is 1, turn askForTask true and write asking for the task name
            case(userInput==1):
                process.stdout.write("Task name: ")
                askForTask = true
                break;
            //If the input is 2, turn askForRemoval true and write asking for the task index
            case(userInput==2):
                taskList.print()
                process.stdout.write("Which task do you want to delete? (Enter the name, not the number)\n\n")
                askForRemoval = true
                break;
            //If the input is 3, call the print() method to print the list
            case(userInput==3):
                taskList.print()
                printMenu()
                break;  
        }
    }
})