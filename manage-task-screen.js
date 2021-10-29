// TODO: Import your models, here
const { Task, Note } = require('./models');

class ManageTasksScreen {
  constructor(rl) {
    this.rl = rl;
    this.items = [];
  }

  async printUi() {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEMS                   (c) 1987   *");
    console.log("********************************************");
    console.log();

    // TODO: query your to do items, tasks and notes, here, only ones that are
    //       NOT completed TODO: print out items here
    
    const tasks = await Task.findAll({
      where: {
        completed: false,
      },
    });

    const notes = await Note.findAll({
      where: {
        completed: false,
      },
    });
    
    this.items = tasks.concat(notes).sort((a, b) => a.createdAt - b.createdAt);

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.title) {
        console.log(`${i + 1}. ${item.title.substring(0, 70)}`);
      } else {
        console.log(`${i + 1}. ${item.content.substring(0, 70)}`);
      }
    }

    console.log();
    console.log("A. Add a new item");
    console.log("X. Return to main menu");
    console.log("C. Continue");
    console.log();
  }

  async show() {
    await this.printUi();
    this.rl.question("> ", answer => {
      const index = Number.parseInt(answer) - 1;
      
      let screen = this;
      if (answer === "A") {
        screen = new AddItemScreen(this.rl);
      } else if (answer === "X") {
        screen = new MainScreen(this.rl);
      } else if (!isNaN(index)) {
        const itemIdx = this.items[index].id;
        if (this.items[index].title) {
          screen = new ItemDetailScreen(this.rl, itemIdx, 'Task');
        } else {
          screen = new ItemDetailScreen(this.rl, itemIdx, 'Note');
        }
        this.items = [];
      }
      screen.show();
    });
  }
}

exports.ManageTasksScreen = ManageTasksScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { AddItemScreen } = require('./add-item-screen');
const { MainScreen } = require('./main-screen');
const { ItemDetailScreen } = require('./item-detail-screen');
