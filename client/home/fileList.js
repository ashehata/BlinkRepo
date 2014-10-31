Session.setDefault('sortBy', {timestamp:-1})
Session.setDefault('sortOrder', -1)
Template.fileList.events({
  'click .upload-btn' : function(e,tmpl){
    file = tmpl.find(".fileselect").files[0];
    //iOS will upload images with the same name. TODO: Add option to rename uploaded file.
    if (Files.findOne({filename: file.name})){
      bootbox.confirm("File already exists. Overwrite existing file?", function(result){
        if (result)
          uploadFile(file);
        else
          return;
      });
    }
    else{
      uploadFile(file);
    }
  },
  'change .fileselect': function(e, tmpl){
    file = tmpl.find(".fileselect").files[0]
    Session.set("selectedFileName", file.name)
  },
  'click th': function(e,tmpl){
    var newSort = e.target.id;
    if (Session.get('sortOrder') == -1){
      Session.set('sortBy', EJSON.parse('{"'+newSort+'":0}'));
      Session.set('sortOrder', 0);
    }
    else{
      Session.set('sortBy', EJSON.parse('{"'+newSort+'":-1}'));
      Session.set('sortOrder', -1);
    }
  },
  'click .download-selected': function(){
    var selected = $('input:checked').each(function(){
      window.open('files/download/'+this.value);
    });
    console.log(selected)
  }
})

Template.fileList.helpers({
  file : function(){
    var sort = Session.get('sortBy');
    if (Session.get("searchQuery")){
    var results;
    EasySearch.search('files',  Session.get("searchQuery"), function (err, data) {
        results = data.results
    });
      return results.sort(sort);
    }
    else 
      return Files.find({},{sort:sort});
  },
  selectedFilename : function(){
    return Session.get("selectedFileName")
  }
})

uploadFile = function(file, logMessage){
  console.log(file)
  uploaded = false;
  reader = new FileReader;
  reader.onloadend = function(e){
    console.log("File read!!");
    blob = new Uint8Array(this.result);
    Meteor.call("upload", file.name , blob, logMessage);
    $('.fileselect').val('');
    Session.set("selectedFileName", "File Uploaded Successfully");
    return;
  }
  reader.readAsArrayBuffer(file);
}

Template.singleFile.events({
  'click tr': function(e, tmpl){
    if (this.type.indexOf('image')!= -1)
      $(tmpl.find('.file-details')).slideToggle(200);
  },
  'click .download': function(e, tmpl){
    e.stopPropagation();
  }
})