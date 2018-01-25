class App extends React.Component{
    constructor(props){
        super(props)

        this.wordList = [["camel","cat","mango"],["keyboard","computer","atmosphere","elephant"]]
        this.generateRandomWord = this.generateRandomWord.bind(this)
        this.generateWordWithDashes = this.generateWordWithDashes.bind(this)
        this.checkIfCompleted = this.checkIfCompleted.bind(this)
        this.checkIfLimitReached = this.checkIfLimitReached.bind(this)
        this.fillChar = this.fillChar.bind(this)
        this.checkIfPresent = this.checkIfPresent.bind(this)
        this.reset = this.reset.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.giveClue = this.giveClue.bind(this)
        this.actualWord=""
        this.level = 0;

        this.state = {
            wordWithDashes:"",
            trials:0,
            score:0,
            endGame:false
        }
    }

    generateRandomWord(){
        //alert("hello")
        this.level = this.level+1

        let index = Math.floor( (Math.random()*this.wordList[this.level-1].length))
        this.actualWord = this.wordList[this.level-1][index]         
        
        
    
    }

    generateWordWithDashes(){
        
        this.generateRandomWord();
        
        console.log(this.actualWord)

        let temp = "";
        for(let i=0;i<this.actualWord.length;i++)
            temp = temp+"-"

         this.setState((prevState)=>{


             return {
                
                wordWithDashes : temp
             }
         })
    }

    checkIfCompleted(){
        return (this.state.wordWithDashes.length>0 && (this.state.wordWithDashes.indexOf("-") <0))
    }
    checkIfLimitReached(){
        return this.state.trials > (this.actualWord.length+3)
    }
    checkIfPresent(char){
        return this.actualWord.indexOf(char)>-1
    }




    fillChar(char){

        if(this.checkIfPresent(char)){
            let temp = "";
            for(let i=0;i<this.actualWord.length;i++)
            {
               if(this.actualWord[i]==char)
                    temp = temp+char
                else
                    temp = temp+this.state.wordWithDashes[i]
            }    
    
            this.setState((prevState)=>{
                return {
                    wordWithDashes:temp,
                    trials:prevState.trials+1,
                    score: prevState.score+10
                }
            })
        }
        else{
            this.setState((prevState)=>{
                return {
                    trials:prevState.trials+1,
                    score: prevState.score-10

                }
            })
        }


    }

    reset(){

        this.actualWord = ""
        this.level = 0
        this.setState(()=>({wordWithDashes:"",
        trials:0,
        score:0})
        )
    }
    
    nextLevel(){
        this.actualWord = ""
        this.setState(()=>({wordWithDashes:"",
        trials:0,
        })
        )

    }
    giveClue(){
        let index = 0;
        do{
          index = Math.floor( (Math.random()*this.actualWord.length))
        }while(this.state.wordWithDashes[index]!="-");

        let index2 = Math.floor( (Math.random()*this.actualWord.length))

        let temp = "";
        let char = this.actualWord[index]

        for(let i=0;i<this.actualWord.length;i++)
        {
           if(this.actualWord[i]==char)
                temp = temp+char
            else
                temp = temp+this.state.wordWithDashes[i]
        }    


        this.setState((prevState)=>{
            return {
                wordWithDashes:temp,
                trials:prevState.trials+1,
                score: prevState.score-3
            }
        })
  


    }

    render(){
        return (  
            <div>
                {this.state.wordWithDashes.length==0 &&  <HiddenWord 
                                                            generateWordWithDashes={this.generateWordWithDashes} 
                                                            checkIfCompleted = {this.checkIfCompleted}
                                                            level = {this.level}
                                                            />}

                {   
                    this.actualWord.length>0 
                    && 
                    <Display
                        wordWithDashes={this.state.wordWithDashes} 
                        trials = {this.state.trials} 
                        level = {this.level}
                        remaining={this.actualWord.length+3-this.state.trials} 
                        score={this.state.score}
                     />
                }

                { this.state.wordWithDashes.length>0 && !this.checkIfLimitReached() && !this.checkIfCompleted() && <Guess fillChar={this.fillChar}/>}
                { this.checkIfLimitReached() && <p style={{fontSize:'3em'}}> Maximum trials reached</p>}
                { this.checkIfCompleted() && alert("Level Completed!!!") }
                { this.level == 2 && this.checkIfCompleted() && alert("All levels completed")}
                { (this.checkIfLimitReached()|| (this.level == 2 && this.checkIfCompleted()))  && <PlayAgain reset = {this.reset}/> }
                { this.checkIfCompleted() &&  this.level != 2 &&  <NextLevel nextLevel = {this.nextLevel} reset = {this.reset}/> }
                {this.state.wordWithDashes.length>0 && !this.checkIfLimitReached() && !this.checkIfCompleted() && <Help giveClue = {this.giveClue}/>}
            </div>
        ); 
    }

}
const RandomWord = (props) => {
        return (
            <div>
                
            </div>
        );
        
    }
    


const HiddenWord = (props) =>{
         
        return(
                <div>    
                            {  props.level == 0 && <button onClick={props.generateWordWithDashes}>Start Game</button>}
                            {  props.level > 0 && <button onClick={props.generateWordWithDashes}>Next Level </button>}

                </div>
                )
            


}


class Guess extends React.Component{
    constructor(props){
        super(props)
        this.guessChar = this.guessChar.bind(this)

    }
    guessChar(e){

        e.preventDefault();
        //alert(e.target.elements.guess.value)
        let inp = e.target.elements.guess.value.trim();
        
        if(inp.length != 1)
            alert("Enter valid input(one character)")
        else
            this.props.fillChar(inp.toLowerCase())
        e.target.elements.guess.value = ""
    }


    
    render(){
        return(
            <div style={{marginLeft:"1.1em",width:"15em"}} >
                <form onSubmit = {this.guessChar}>
                    <input name="guess" type="text"/>
                    <button>Guess</button>
                </form>
        
             </div>

        )
    }
}

const PlayAgain = (props) =>{

    return(
        <div style={{marginLeft:"1.1em",width:"18em"}}>
        <button onClick={props.reset}>Play Again</button>
        </div>
    )
}

const NextLevel = (props) => {

    return(
        <div style={{marginLeft:"1.1em",width:"18em"}}>
            <button onClick={props.nextLevel}>Next Level</button>
            <br/>
            <br/>
            <button onClick={props.reset}>Exit</button>

        </div>
    )
    
}

const Help = (props) => {
    return(
        <div style={{marginLeft:"1.1em"}}>
            <br/>
            <button onClick = {props.giveClue}> Clue </button>
        </div>
    )
}

class Display extends React.Component{

    constructor(props){
        super(props)
   }


    render(){

        return(
            <div>
            <div style={{marginLeft:"1.1em",width:"40em"}}>
                    <table>
                        <tr>
                            <th>Level:{this.props.level}</th>
                            <th>Score:{this.props.score}</th>
                            <th>Remaining Trials:{this.props.remaining}</th>
                            
                        </tr>
                    </table>   
            </div>
            <br />

            <div style={{border:"4px solid black",marginLeft:"1.1em",width:"40em"}}>

                <p style={{fontSize:'2em',textAlign:'center'}}>{this.props.wordWithDashes}</p>

            </div>
            <br />

            
            </div>

        );
    }



}


var appRoot = document.getElementById("app");
ReactDOM.render(<App />,appRoot);