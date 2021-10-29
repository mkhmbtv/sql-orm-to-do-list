// TODO: Import your models, here
const { Task, Note, Sequelize: { Op } } = require('./models');

class SearchScreen {
  constructor(rl) {
    this.rl = rl;
  }

  async printUi() {
    console.clear();
    console.log("********************************************");
    console.log("* SEARCH ITEMS                  (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log("Please type your search term and hit Enter.");
    console.log();
  }

  async printResultsUi(term) {
    console.clear();
    console.log("********************************************");
    console.log("* SEARCH RESULTS                (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log("Your search matches");
    console.log();

    // TODO: Search the notes and to-do items
    const notes = await Note.findAll({
      where: {
        content: {
          [Op.substring]: term,
        },
      },
    });

    const tasks = await Task.findAll({
      where: {
        [Op.or]: [
          { 
            title: { [Op.substring]: term }
          },
          {
            description: { [Op.substring]: term }
          },
        ]
      }
    })
    // TODO: Print them out
    const allItems = tasks.concat(notes).sort((a, b) => a.createdAt - b.createdAt);
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      if (item.title) {
        console.log(`${i + 1}. ${item.title.substring(0, 70)}`);
      } else {
        console.log(`${i + 1}. ${item.content.substring(0, 70)}`);
      }
    }

    console.log();
  }

  async show() {
    await this.printUi();
    this.rl.question("> ", async term => {
      await this.printResultsUi(term);
      this.rl.question("Enter to return to the main screen. ", () => {
        const screen = new MainScreen(this.rl);
        screen.show();
      });
    });
  }
}

exports.SearchScreen = SearchScreen;

const { MainScreen } = require('./main-screen');
