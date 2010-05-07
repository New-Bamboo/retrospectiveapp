Note = Model("note", {
  persistence: Model.RackJSONPersistence('/notes')
}, {

  id: function () {
    return this.attributes["_id"] || this.attributes["id"] || null;
  }
});