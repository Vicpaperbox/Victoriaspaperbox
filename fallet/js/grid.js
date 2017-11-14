function Grid(i,t,r,h){this.el=i,this.width=t,this.height=r,this.gridPx=h,this.grid=this.createArray(t,r),this.action=void 0,$(this.el).width(t*h),$(this.el).height(r*h)}Grid.prototype={createArray:function(i){var t=new Array(i||0),r=i;if(arguments.length>1)for(var h=Array.prototype.slice.call(arguments,1);r--;)t[i-1-r]=this.createArray.apply(this,h);return t},getGrid:function(){return this.grid},addSquare:function(i){var t=new Square(i);$(t.el).css("width",this.gridPx+"px;"),$(t.el).css("height",this.gridPx+"px;"),$(t.el).css("line-height",this.gridPx+"px;"),$(this.el).append(t.el),t.render(4,0),this.movingSquare=t},hasMovingSquare:function(){return void 0!==this.movingSquare},canMove:function(){return!!this.movingSquare&&(!(this.movingSquare.Y()+1>=this.height)&&void 0===this.grid[this.movingSquare.X()][this.movingSquare.Y()+1])},saveMovingSquare:function(){this.movingSquare.isDirty=1,this.grid[this.movingSquare.X()][this.movingSquare.Y()]=this.movingSquare,this.movingSquare=void 0},moveSquareDown:function(){void 0!==this.action&&(this.movingSquare[this.action](),this.action=void 0),this.movingSquare.moveDown()},moveSquareLeft:function(){this.movingSquare.X()-1<0||void 0===this.grid[this.movingSquare.X()-1][this.movingSquare.Y()+1]&&(this.action="moveLeft")},moveSquareRight:function(){this.movingSquare.X()+1>=this.width||void 0===this.grid[this.movingSquare.X()+1][this.movingSquare.Y()+1]&&(this.action="moveRight")},getDirtyRows:function(){var t=[];for(i=0;i<this.height;i++)for(j=0;j<this.width;j++)if(void 0!==this.grid[j][i]&&1==this.grid[j][i].isDirty){t.push(i);break}return t},getDirtyCols:function(){var t=[];for(j=0;j<this.width;j++)for(i=0;i<this.height;i++)if(void 0!==this.grid[j][i]&&1==this.grid[j][i].isDirty){t.push(j);break}return t},clearDirty:function(){for(j=0;j<this.width;j++)for(i=0;i<this.height;i++)void 0!==this.grid[j][i]&&(this.grid[j][i].isDirty=0)},hasDirtySquares:function(){for(j=0;j<this.width;j++)for(i=0;i<this.height;i++)if(void 0!==this.grid[j][i]&&1==this.grid[j][i].isDirty)return!0;return!1},dropFloaters:function(){for(i=this.height-2;i>=0;i--)for(j=0;j<this.width;j++)if(void 0!==this.grid[j][i]){var t=i;for(k=i+1;k<this.height;k++)void 0===this.grid[j][k]&&(this.grid[j][k]=this.grid[j][t],this.grid[j][k].Y(k),this.grid[j][k].isDirty=1,this.grid[j][t]=void 0,t=k)}},isSquareEmpty:function(i,t){return void 0===this.grid[i]||void 0===this.grid[i][t]},getLetters:function(i,t,r,h){for(var s="",e=i;e<=r;e++)for(var o=t;o<=h;o++){if(this.isSquareEmpty(e,o))return"";s+=this.grid[e][o].letter}return s},markSquaresUsed:function(i,t,r,h){for(var s=i;s<=r;s++)for(var e=t;e<=h;e++)this.grid[s][e].isUsed=1},removeUsed:function(){for(j=0;j<this.width;j++)for(i=0;i<this.height;i++)void 0!==this.grid[j][i]&&1==this.grid[j][i].isUsed&&($(this.grid[j][i].el).remove(),this.grid[j][i]=void 0)}};