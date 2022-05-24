import List "mo:base/List";
import Debug "mo:base/Debug";
actor DKeeper{
  public type Note ={
    title :Text;
    content:Text;
  };
//stable keyword : to keep the varible from emptying after dfx deploy.
  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote (titleText:Text, contentText:Text){
    let newNote:Note ={
      title=titleText;
      content=contentText;
    };

    notes:=List.push(newNote,notes);
    Debug.print(debug_show(notes));
  };

  public query func readNotes(): async [Note] {
    return List.toArray(notes);
  };

  public func deleteNote(id:Nat){
    //front part of the list
    let takeList = List.take<Note>(notes,id);
    //backpart of the list
    let dropList = List.drop<Note>(notes,id+1);
    notes:= List.append<Note>(takeList,dropList);
  };

}