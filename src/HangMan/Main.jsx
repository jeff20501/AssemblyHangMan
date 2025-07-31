import { Languages } from './components/Language'
import {languages} from './components/languages.js'
import {getFarewellText, randomWords} from './components/utils.js'
import {useState} from 'react'
import { useWindowSize } from 'react-use'
import  clsx  from 'clsx';
import Confetti from 'react-confetti'
export function Main(){
     
    // state value
    const [currentWord, setCurrentWord] = useState(()=>randomWords())
    const [guessedLetters, setGuessedLetters] = useState([])

    // derived values
    const wrongGuessArray= guessedLetters.filter(letter=>!currentWord.includes(letter))
    /*
        we are filtering out the letters that are NOT in the currentWord string and store then in the wrongGuessArray
    */
   const wrongGuessCount= wrongGuessArray.length
   const isGameWon =  currentWord.split("").every(letter=>guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount>=languages.length-1
    const isGameOver= isGameWon || isGameLost
    const lastLetterGuess = guessedLetters[guessedLetters.length-1]
    const isLastGuessIncorrect = lastLetterGuess && !currentWord.includes(lastLetterGuess)
    

    // static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    
    

    
    const languageData = languages.map((lang,index)=>{
        const isLanguageLost = index<wrongGuessCount        
        const className=clsx('chips', isLanguageLost&&'lost')
        return{
            key:lang.name,
            lang: lang,
            className:className         
        }
    })
    

    function addGuessedLetter(alpha){
        setGuessedLetters(prevGuess=>
            prevGuess.includes(alpha)?
            prevGuess:
            [...prevGuess, alpha]
        )
    }

    function NewGame(){
        setCurrentWord(randomWords())
        setGuessedLetters([])

    }

    const letterElements = currentWord.split("").map((letter, index)=>{
        const missedLetterClass = clsx(
            isGameLost&&!guessedLetters.includes(letter)&&"missed-letter"
        )
        return (
            <span className={missedLetterClass}
                key={index}>{guessedLetters.includes(letter)?letter.toUpperCase():isGameLost?letter.toUpperCase():""}
            </span>
    )}
    )    
    
    const keyboard = alphabet.split("").map(alpha=>{
        const isGuessed = guessedLetters.includes(alpha)
        const isCorrect = isGuessed&& currentWord.includes(alpha)
        const isWrong = isGuessed&& !currentWord.includes(alpha)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

    
        return(
            <button 
            className={className} 
            key={alpha}
            disabled={isGameOver}
            onClick={()=>addGuessedLetter(alpha)} >
                {alpha.toUpperCase()}
            </button>
        )
    })

    const gameStatusClass = clsx('stats', {
        isWon: isGameWon,
        isLost: isGameLost,
        farewell: !isGameOver&&isLastGuessIncorrect
    })

    function renderStats(){
        if(!isGameOver&&isLastGuessIncorrect){
            return (
            <p>{getFarewellText(languages[wrongGuessCount-1].name)}</p>
        )
        }

        
            
      
        if(isGameWon){
            return(
                <>
                    <h2>You Win</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }

        if(isGameLost){
            return(
                <>
                    <h2>Game Over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }

    const { width, height } = useWindowSize() // tracks Window dimensions

    return(
        <main>
            {isGameWon? <Confetti  height={height} width={width} recycle={false} numberOfPieces={1000}/>:null}
            <header className="header">
                <h1>Assembly Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming word safe from Assembly!</p>
            </header>

            <section className={gameStatusClass}>
                   {renderStats()}
            </section>
            <section>
                <Languages 
                    languageData={languageData}
                />
            </section>

            <section className='word'>
               {letterElements}
            </section>

            <section className="keyboard">
                {keyboard}
            </section>

            {isGameOver?<button onClick={NewGame} className='newGame_btn'>New Game</button>:""}
            
        </main>
    )
    
}