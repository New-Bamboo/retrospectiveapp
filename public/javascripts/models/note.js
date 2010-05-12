Note = Model("note", {
  clear: function () {
    this.colleciton = []
  }
}, {

  id: function () {
    return this.attributes["_id"] || this.attributes["id"] || null;
  }
});