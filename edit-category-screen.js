// TODO: import your models, here
const { Category } = require('./models');

class EditCategoryScreen {
  constructor(rl, categoryId) {
    this.rl = rl;
    this.categoryId = categoryId;
  }

  async printUi() {
    // TODO: Get the category by its index
    const category = await Category.findByPk(this.categoryId);
    console.clear();
    console.log("********************************************");
    console.log("* EDIT CATEGORY                 (c) 1987   *");
    console.log("********************************************");
    console.log();
    
    // TODO: Show the category name here
    console.log(`You are editing "${category.name}".`);
    console.log();
    console.log("What would you like to rename it? Hit");
    console.log("\"Enter\" when you are done.");
    console.log();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async show() {
    await this.printUi();
    this.rl.question("> ", async newCategoryName => {

      // TODO: Get the category by its categoryId that was passed in through the
      //       constructor and is stored in this.categoryId
      const category = await Category.findByPk(this.categoryId);
      try {
      // TODO: Update it with the new category name
      category.name = newCategoryName;
      // TODO: Save it
      await category.save();
      } catch (err) {
        for (const validationError of err.errors) {
          console.log("*", validationError.message);
        }
        await this.sleep(5000);
      }

      new ManageCategoriesScreen(this.rl).show();
    });
  }
}

exports.EditCategoryScreen = EditCategoryScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { ManageCategoriesScreen } = require('./manage-categories-screen');
