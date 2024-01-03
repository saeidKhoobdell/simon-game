var buttonColours = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern  = []
var level = 0;
var started = false
var record_level = 0



$('.record').text(record_level)

$('body').keypress(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence()
        
        started = true
    }
    
})






$('.btn').click(
    function(){ 
    var userChosenColor = $(this).attr('id') 
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatepress(userChosenColor)
    checkAnswer(userClickedPattern.length -1)
    }
)


function nextSequence(){
    userClickedPattern = [];
    level ++
    $("#level-title").text('level '+ level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    
    $("." + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    
}
function playSound(soundName){
    var audio = new Audio('sounds/'+soundName+'.mp3')
    audio.play()
}

function animatepress(currentColor){
    $("."+currentColor).addClass('pressed')
    setTimeout(()=> $("."+currentColor).removeClass('pressed'), 100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log(userClickedPattern,gamePattern, level)
        if (userClickedPattern.length == gamePattern.length){
        if (level > record_level){
            record_level = level
            $('.record').text(record_level).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
            
        }    
            
        setTimeout(function(){
            nextSequence()
        },1000)

        }
        
    }
    else{
        playSound('wrong')
        $('body').addClass('game-over')
        $('#level-title').text('Game Over, Press Any Key to Restart')
        setTimeout(()=> $('body').removeClass('game-over'), 200)
        
        startOver()
    }
}
function startOver(){
    gamePattern = []
    level = 0
    started = false
}