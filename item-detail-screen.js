// TODO: import your models, here
const { Task, Note, Category } = require('./models');

class ItemDetailScreen {
  constructor(rl, detailId, type) {
    this.rl = rl;
    this.detailId = detailId;
    this.type = type;
  }

  async printNoteUi(item) {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEM (NOTE)             (c) 1987   *");
    console.log("********************************************");
    console.log();

    // TODO: Display the item, here
    console.log(item.content)
    console.log();
  }

  async  printTaskUi(item) {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEM (TASK)             (c) 1987   *");
    console.log("********************************************");
    console.log();

    // TODO: Display the item, here
    console.log('TITLE:', item.title);
    console.log('CATEGORY:', item.Category.name)
    console.log('DESCRIPTION:', item.description);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async show() {
    // TODO: Get the item from the database, task or note
    let item;
    if (this.type === 'Task') {
      item = await Task.findByPk(this.detailId, { include: Category });
    } else {
      item = await Note.findByPk(this.detailId);
    }
    
    if (item) {
      if (item.content) {
        await this.printNoteUi(item);
      } else {
        await this.printTaskUi(item);
      }
      
      console.log("Type \"C\" and hit \"Enter\" to complete this");
      console.log("task and return to the list screen. Just");
      console.log("hit \"Enter\" to return to the list screen.");
      this.rl.question("> ", async answer => {
        if (answer === "C") {
          // TODO: Update the item so that its complete
          item.completed = true;
          // TODO: Save the item
          await item.save();
          this.sleep(5000);
        }
        const screen = new ManageTasksScreen(this.rl);
        screen.show();
      });
    } else {
      const screen = new ManageTasksScreen(this.rl);
      screen.show();
    }
  }
}

exports.ItemDetailScreen = ItemDetailScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { ManageTasksScreen } = require('./manage-task-screen');
