/** 
 * Create Abstract class to use polymorphism 
 */
class AbstractEditor{

    getEditorUI (){
        throw "Override getEditorUI() in AbstractEditor please!";
    }
}

/** 
 * Create derivate class ButtonEditor
 */
class ButtonEditor{

    getEditorUI(){
        return "<button />";
    }
}

/** 
 * Create derivate class TextFieldEditor
 */
class TextFieldEditor{
    
    getEditorUI(){
        return "<input />";
    }
}

/** 
 * Create factory class
 */ 
class PropertyEditorFactory {

    getPropertyEditor(type){
        switch (type) {
            case "button":
                return new ButtonEditor();
                break;

            case "text":
                return new TextFieldEditor();
                break;
            
            default:
                break;
        }
    }
}

/** 
 * Create factory class (second way)
 */ 

let EDITORS = {
    "button": ButtonEditor,
    "text": TextFieldEditor
}
    
class PropertyEditorFactory2 {

    getPropertyEditor(type){
        return new EDITORS[type]();
    }
}

// USAGE

var propertyEditorFactory = new PropertyEditorFactory();

// use factory to make two different instances
var inst1 = propertyEditorFactory.getPropertyEditor("button");
var inst2 = propertyEditorFactory.getPropertyEditor("text");

// same interface for both instances
console.log(inst1.getEditorUI()); 
console.log(inst2.getEditorUI());

// second way

var propertyEditorFactory2 = new PropertyEditorFactory2();

var inst21 = propertyEditorFactory2.getPropertyEditor("button");
var inst22 = propertyEditorFactory2.getPropertyEditor("text");

console.log(inst21.getEditorUI()); 
console.log(inst22.getEditorUI());