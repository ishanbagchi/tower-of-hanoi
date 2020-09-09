(function () {
    'use strict';
    angular.module('demo.home',[]).controller('HomeCtrl',['$scope',function($scope){
        $scope.level=0;
        $scope.message="Hello world";
        $scope.gameStatus="START";
        $scope.maxLevel=15;
        $scope.templatePeg=[];
        $scope.peg={A:[],B:[],C:[]};
        $scope.source='';
        $scope.destination='';
        //Method declaration
        $scope.createTemplatePeg=function(){
            for(var i=0;i<$scope.maxLevel+4;i++){
                $scope.templatePeg[i]=-1;
            }
        }
        $scope.changeLevel=function(){
            $scope.level=$scope.level+1;
            var diskNum=$scope.level+2;
            console.log(diskNum)
            $scope.peg.A=angular.copy($scope.templatePeg);
            $scope.peg.B=angular.copy($scope.templatePeg);
            $scope.peg.C=angular.copy($scope.templatePeg);
            for(var i=0;i<$scope.level+2;i++){
                $scope.peg.A[$scope.templatePeg.length-i-1]=angular.copy(diskNum);
                diskNum--;
            }
            $scope.gameStatus='GO';
        }
        function checkEmpty(disk){
            return disk==-1;
        }
        $scope.checkResult=function(){
            //Check for game over
            if(!isSorted($scope.peg.A)){
               $scope.gameStatus='GAME OVER' ;
            }else if(!isSorted($scope.peg.B)){
               $scope.gameStatus='GAME OVER' ;
            }else if(!isSorted($scope.peg.C)){
               $scope.gameStatus='GAME OVER' ;
            }
            //Check for win
            if($scope.gameStatus=='GO'){
                if($scope.peg.A.every(checkEmpty) && $scope.peg.B.every(checkEmpty) && isSorted($scope.peg.C)){
                    $scope.gameStatus="WIN";
                }
            }
        }
        
        $scope.restartGame=function(){
            $scope.level=0;
            $scope.changeLevel();
            $scope.gameStatus='GO';
        }
        
        $scope.playNextLevel=function(){
            $scope.changeLevel();
        }
        
        $scope.moveDisk=function(){
            console.log('From Peg:'+$scope.source+" to Peg:"+$scope.destination);
            //Modify source peg
            var diskToMove=-1;
            for(var i=$scope.peg[$scope.source].length;i>1;i--){
                if($scope.peg[$scope.source][i-1]==-1 && $scope.peg[$scope.source][i]){
                    diskToMove=$scope.peg[$scope.source][i];
                    $scope.peg[$scope.source][i]=-1;
                    break;
                }
            }
            for(var i=$scope.peg[$scope.destination].length-1;i>1;i--){
                if($scope.peg[$scope.destination][i]==-1 && diskToMove){
                    $scope.peg[$scope.destination][i]=diskToMove;
                    break;
                }
            }
            //Modify destination peg
            $scope.source=$scope.destination='';
            $scope.checkResult();
        }
        
        $scope.clickPeg=function(peg){
            if($scope.source!='' && $scope.source==peg){
                $scope.source='';
            }else if($scope.source==''){
                $scope.source=peg;
            }
            if($scope.source!='' && $scope.source!=peg){
                $scope.destination=peg;
            }
            if($scope.source!='' && $scope.destination!='')
                $scope.moveDisk();
        }
        
        $scope.startGame=function(){
            $scope.changeLevel();
        }
        
        $scope.showCredit=function(){
            $scope.gameStatus='CREDIT';
        }
        
        $scope.gotoHome=function(){
            $scope.gameStatus='START';
        }
        //Method declaration
        $scope.createTemplatePeg();
    }]);
}());