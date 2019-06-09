function game() {
    // window.addEventListener('DOMContentLoaded', function () {


        /*************************************************************************/
        /******************************INITIALISATION*****************************/
        /*************************************************************************/

        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');


        /*************************************************************************/
        /***********************************VARIABLE******************************/
        /*************************************************************************/

        //////////////////////  DECLARATION VARIABLE  //////////////////////////////

        var vaADroite = false;
        var vaEnHaut = false;
        var indexTab = 0;
        var indexLevier = 0;
        var comptani1 = 0;
        var plafond = 0; // 
        var score = 0; 
        var xcrabe = 600;
        var ycrabe = 300;
        var swcrabe = 100;
        var sycrabe = 120;
        var touch = false;
        var myAnimation;
        var tab = [];
        var tabInverse = [];


        /////////////////////////  Tableau de création des crabes  ////////////////////////////////////
        tab = [0, 200, 1350, 2000, 2700, 3400, 4200, 5100];
        tabInverse = [500, 1100, 1700, 2300, 3900, 4500, 4800, 5300];

      /////////////////////////  IMAGE FOND  ////////////////////////////////////

      var x = 0;
      var imageBackground = new Image();
      imageBackground.src = "Image/bgTunnelpetit.png";
      ctx.drawImage(imageBackground, x, 0, 2813, 500)

      /////////////////////////  IMAGE SOURIS  ////////////////////////////////////

      var aze = 20;
      var y = 170;
      var souris = new Image();
      souris.src = "Image/imageSprite.png";
      ctx.drawImage(souris, 0, 0, 461, 354, aze, y, 130, 180);

      /////////////////////////  IMAGE CRABE  ////////////////////////////////////

      var azecrabe = 620;
      var y = 170;
      var crabe = new Image();
      crabe.src = "Image/imageSprite.png";
      ctx.drawImage(crabe, 0, 354, 397, 354, azecrabe, y, 130, 180);
      
      var ConstructeurDeCrabe = function() {
        this.crabe = new Image();
        this.crabe.src = "Image/imageSprite.png";
        this.sprite1 = sprite.crabe[indexTab][0];
        this.sprite2 = sprite.crabe[indexTab][1];
        this.sprite3 = sprite.crabe[indexTab][2];
        this.sprite4 = sprite.crabe[indexTab][3];
        this.xcrabe = xcrabe;
        this.ycrabe = ycrabe;
        this.swcrabe = swcrabe;
        this.sycrabe = sycrabe; 
        this.draw = function(x){
          ctx.drawImage(this.crabe, this.sprite1, this.sprite2, this.sprite3, this.sprite4, this.xcrabe + x, this.ycrabe, this.swcrabe, this.sycrabe);
        }
      }

      /////////////////////////  IMAGE GAME OVER    ////////////////////////////////////

      
      var go = new Image();
      go.src = "Image/gameOver.png";
      ctx.drawImage(go, 0, 0, 900, 500);

      /////////////////////////  IMAGE LEVIER  ////////////////////////////////////

      var xLevier = 6000;
      var levier = new Image();
      levier.src = "Image/imageSprite.png";
      ctx.drawImage(levier, 0, 706, 308, 354, xLevier, 260, 130, 180);

    /*************************************************************************/
    /***********************************KEY CODE*****************************/
    /*************************************************************************/
    window.addEventListener('keydown', function (verrifClavier) {
        switch (verrifClavier.keyCode) {
            case 39: // Droit
                if(touch){
                    vaADroite = false;
                } else {
                vaADroite = true;
                }
                break;
            case 32: // Espace
                if(touch){
                }else {
                plafond ++;
                }
            break;
        }
    })

    window.addEventListener('keyup', function (verrifClavier) {
        switch (verrifClavier.keyCode) {
            case 39: // Droit
                vaADroite = false;
                break;
            case 32: // Espace
            if(touch){
            }
        }
    })



        /*************************************************************************/
        /******************************* FONCTION *******************************/
        /*************************************************************************/
         var run = function(){ // Fonction permettant de faire bouger la souris
            if (x < -2813) { // Les 2 images backgrounds reviennent à x = o
                    x = 0;
                }
            if (aze < 200) { // Si le x de la souris est infèrieur à 200
                    aze += 10;
                } else { // Quand la souris est égale à 200, c'est le baxkgournd qui bouge
                    x -= 10;
                    xLevier -=10;
                }
                score++
        };

        var runAnimation = function(){
            // Cette fonction permet de faire articulier les différents personnages
            if (comptani1 > 2){
                if(indexTab >= sprite.run.length -1){
                    indexTab = 0;
                } else{ 
                indexTab ++;
                console.log(('index : ' + indexTab))
                }
                comptani1 = 0 ;
            } comptani1 ++;
            return indexTab;
        };


        var background = function(){ // Afichage du background
            ctx.drawImage(imageBackground, x, 0, 2813, 500);
            ctx.drawImage(imageBackground, x + 2813, 0, 2813, 500);
            
        };

        var die = function(){ // Lorsque la souris touche un crabe
            touch = true;
            ctx.drawImage(go, 0, 0, 900, 500);
            cancelAnimationFrame(myAnimation);
        }

        /*************************************************************************/
        /***********************************RAF***********************************/
        /*************************************************************************/
        function gameTime(timestamp) {
            console.log('request')
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (vaADroite) {
                run();
                runAnimation();
                xcrabe -= 8;
                }

            if(touch){
              xcrabe;
            }
              else{
              xcrabe -= 2
            }  

            if (vaEnHaut){ //
                y -= 50;
                console.log('y' + y)
            } else {
            }
            background()

            ctx.drawImage(levier, 0, 706, 308, 354, 1500, 260, 130, 180);

            //////////////////////////// Affichage heros////////////////////////////
            if(plafond%2 == 0){
                ctx.drawImage(souris, sprite.run[indexTab][0], sprite.run[indexTab][1], sprite.run[indexTab][2], sprite.run[indexTab][3], aze, y, 130, 180);
            } else {
                ctx.save();
                ctx.translate(0, 430);
                ctx.scale(1, -1);
                ctx.drawImage(souris, sprite.run[indexTab][0], sprite.run[indexTab][1], sprite.run[indexTab][2], sprite.run[indexTab][3], aze, y, 130, 180);
                ctx.restore();
            }

            ////////////////////////// Affichage Score //////////////////////////

            ctx.font = '25pt Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'magenta';
            ctx.fillText('Score : ' + score, 750, 250);

            ////////////////////////// Dessin des crabes //////////////////////////


            // Dessin des crabes au sol
            for(let i = 0; i<= 7; i++ ){
              let crabe = new ConstructeurDeCrabe();
              crabe.draw(tab[i])
            }

            // Dessin du levier de fin
            ctx.drawImage(levier, sprite.levier[indexLevier][0], sprite.levier[indexLevier][1], sprite.levier[indexLevier][2], sprite.levier[indexLevier][3], xLevier, 260, 130, 180);


            
            // Dessin des crabes au plafond
            ctx.save();
                ctx.translate(0, 430);
                ctx.scale(1, -1);
                for(let i = 0; i<= 7; i++ ){
                  let crabe = new ConstructeurDeCrabe();
                  crabe.draw(tabInverse[i])
                }
            ctx.restore();


            //Quand la souris arrive au niveau du levier (action du levier, afichage du cv et isolation du requestanimationframe)
            if (aze < xLevier + 100 && aze + 90 > xLevier && y < 260 + 150 && y + 140 > 260) {indexLevier = 2; cv = true; touch = true}

            // Les différents calcules pour savoir s'il y a collision
            for(let i = 0 ; i<=7; i++){
              if(plafond%2== 0){
                if (aze < xcrabe + tab[i] + (swcrabe - 30) && aze + 90 > xcrabe  + tab[i] && y < ycrabe + (sycrabe-30) && y + 140 > ycrabe) {die()}
              } else {
                if (aze < xcrabe + tabInverse[i] + (swcrabe - 30) && aze + 90 > xcrabe + tabInverse[i] && y < ycrabe + (sycrabe-30) && y + 140 > ycrabe) {die()}
              }
            }

            // Paramètre de gravité pour que la souris soit bien calé
            y += 9; 
            if (y >240){
                y = 250;
            }

            $(function(){
                // Affichage des différentes compétences 
                switch (score) {
                  case 50:
                      $('#c').animate({opacity:1},900);
                    break;
                  case 100:
                      $('#d').animate({opacity:1},900);
                    break;
                  case 150:
                      $('#e').animate({opacity:1},900);
                    break;
                  case 200:
                      $('#f').animate({opacity:1},900);
                    break;
                  case 250:
                      $('#g').animate({opacity:1},900);
                    break;
                  case 300:
                      $('#h').animate({opacity:1},900);
                    break;
                  case 350:
                      $('#i').animate({opacity:1},900);
                    break;
                  case 400:
                      $('#j').animate({opacity:1},900);
                    break;
                  case 450:
                      $('#k').animate({opacity:1},900);
                    break;
                  case 500:
                      $('#l').animate({opacity:1},900);
                    break;
                }
                if(cv){
                    $('#cv').fadeIn('slow');
}
                });
                

                // Isolation du request
                if(touch != true){
                    window.requestAnimationFrame(gameTime)
                    console.log('touch')
                }
        };
        
    myAnimation = window.requestAnimationFrame(gameTime)
};
