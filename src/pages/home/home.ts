import { Component,style} from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: any;
  moves: number;
  constructor(public navCtrl: NavController,public toastController: ToastController) {
    this.moves=0;
    this.data = [
      [
        {
          "row": 0,
          "col": 0,
          "value": 1,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_1.jpg',
        },
        {
          "row": 0,
          "col": 1,
          "value": 2,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_2.jpg',
        },
        {
          "row": 0,
          "col": 2,
          "value": 3,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_3.jpg',
        },
        {
          "row": 0,
          "col": 3,
          "value": 4,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_4.jpg',
        },
      ],
      [
        {
          "row": 1,
          "col": 0,
          "value": 5,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_5.jpg',
        },
        {
          "row": 1,
          "col": 1,
          "value": 6,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_6.jpg',
        },
        {
          "row": 1,
          "col": 2,
          "value": 7,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_7.jpg',
        },
        {
          "row": 1,
          "col": 3,
          "value": 8,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_8.jpg',
        },
      ],
      [
        {
          "row": 2,
          "col": 0,
          "value": 9,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_9.jpg',
        },
        {
          "row": 2,
          "col": 1,
          "value": 10,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_10.jpg',
        },
        {
          "row": 2,
          "col": 2,
          "value": 11,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_11.jpg',
        },
        {
          "row": 2,
          "col": 3,
          "value": 12,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_12.jpg',
        },
      ],
      [
        {
          "row": 3,
          "col": 0,
          "value": 13,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_13.jpg',
        },
        {
          "row": 3,
          "col": 1,
          "value": 14,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_14.jpg',
        },
        {
          "row": 3,
          "col": 2,
          "value": 15,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_15.jpg',
        },
        {
          "row": 3,
          "col": 3,
          "value": 0,
          "isCorrect": true,
          "image_url":'../assets/imgs/part_16.jpg',
        },
      ],
    ]
  }
  async ToastMessage() {
    const toast = await this.toastController.create({
      message: 'Wrong Move',
      duration: 2000
    });
    toast.present();
  }
  generateRandomValue = () => {
    var min = 0, max = 16;
    var rand = Math.ceil(Math.random() * (max - min) + min);
    return rand
  }
  setValue(row, col, val) {
    this.data[row][col].value = val;
    let correctValue = (row * 4) + col + 1;
    this.data[row][col].isCorrect = (row == 3 && col == 3 && val == 0) ? true : (correctValue == val);
    return this.data[row][col];
  }
  setImage(row, col, val) {
    this.data[row][col].image_url = val;
    return this.data[row][col];
  }
  move(row, col) {
    this.moves = this.moves+1;
    let self = this;
    let selectedCell = this.data[row][col];
    let canMove = true;

    if (selectedCell.value == 0) {
      // cant move
      canMove = false;
    }
    let targetCellX = row;
    let targetCellY = col;

    function canMoveRight(row, col) {
      let i = 1;
      let col_temp = col + 1;
      while (col_temp <= 3) {
        if (self.data[row][col_temp].value == 0) {
          targetCellY = col_temp;
          return true;
        }
        else {
          col_temp = col_temp + i;
        }
      }
      return false;
    }

    function canMoveUp(row, col) {
      let i = 1;
      let row_temp = row - i;
      while (row_temp >= 0) {
        if (self.data[row_temp][col].value == 0) {
          targetCellX = row_temp;
          return true;
        }
        else {
          row_temp = row_temp - i;
        }
      }
      return false;
    }

    function canMoveDown(row, col) {
      let i = 1;
      let row_temp = row + i;
      while (row_temp <= 3) {
        if (self.data[row_temp][col].value == 0) {
          targetCellX = row_temp;
          return true;
        }
        else {
          row_temp = row_temp + i;
        }
      }
      return false;
    }

    function canMoveLeft(row, col) {
      let i = 1;
      let col_temp = col - i;
      while (col_temp >= 0) {
        if (self.data[row][col_temp].value == 0) {
          targetCellY = col_temp;
          return true;
        }
        else {
          col_temp = col_temp - i;
        }
      }
      return false;
    }

    if (row > 0 && canMoveUp(row, col)) {
      // can move only up
      // get top
      let temp_row = row-1;
      let value = selectedCell.value
      let image_url = selectedCell.image_url;
      while(temp_row >= targetCellX)
      { 
        let temp_value = this.data[temp_row][col].value;
        let temp_url = this.data[temp_row][col].image_url;
        this.setValue(temp_row, col, value);
        this.setImage(temp_row, col, image_url);
        value = temp_value;
        image_url = temp_url;
        temp_row --;
      }
      this.setValue(row, col, 0);
      this.setImage(row,col,image_url)
    }
    else if (row < 3 && canMoveDown(row, col)) {

      // can move only down
      let temp_row = row+1;
      let value = selectedCell.value
      let image_url = selectedCell.image_url;
      while(temp_row <= targetCellX)
      { 
        let temp_value = this.data[temp_row][col].value;
        let temp_url = this.data[temp_row][col].image_url;
        this.setValue(temp_row, col, value);
        this.setImage(temp_row, col, image_url);
        image_url = temp_url;
        value = temp_value;
        temp_row ++;
      }
      this.setValue(row, col, 0);
      this.setImage(row,col,image_url)
    

    } else if (col > 0 && canMoveLeft(row, col)) {
      // can move only left
      let temp_col = col-1;
      let value = selectedCell.value
      let image_url = selectedCell.image_url;
      while(temp_col >= targetCellY)
      { 
        let temp_value = this.data[row][temp_col].value;
        let temp_url = this.data[row][temp_col].image_url;
        this.setValue(row, temp_col, value);
        this.setImage(row, temp_col, image_url);
        image_url = temp_url;
        value = temp_value;
        temp_col --;
      }
      this.setValue(row, col, 0);
      this.setImage(row,col,image_url)

    } else if (col < 3 && canMoveRight(row, col)) {
      // can move only right
      let temp_col = col+1;
      let value = selectedCell.value
      let image_url = selectedCell.image_url;
      while(temp_col <= targetCellY)
      { 
        let temp_value = this.data[row][temp_col].value;
        let temp_url = this.data[row][temp_col].image_url;
        this.setValue(row, temp_col, value);
        this.setImage(row, temp_col, image_url);
        image_url = temp_url;
        value = temp_value;
        temp_col ++;
      }
      this.setValue(row, col, 0);
      this.setImage(row,col,image_url);

    } else {
      // cant move
      canMove = false;

    }

    if (canMove) {
      this.isFinished();
      return
    } else {
      // show message/viber/warn
      //alert('Wrong Move!')
      this.ToastMessage();
    }
  }

  isFinished() {
    // check all are in right position
    let movesLeft = 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.data[row][col].isCorrect == false) {
          movesLeft = movesLeft + 1;
          return; 
        }
      }
    }
    if (movesLeft == 0) {
      alert("congratulation! You Won")
    }
  }
  shuffleBoard = () => {

    var max = 16;
    let randomValues: Array<any> = [];
    let val, rand;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        rand = this.generateRandomValue();
        if (randomValues.indexOf(rand) > -1) {
          do {
            rand = this.generateRandomValue();
          }
          while (randomValues.indexOf(rand) > -1);
          randomValues.push(rand);
          val = rand;
        }
        else {
          randomValues.push(rand);
          val = rand;
        }
        let image = '../assets/imgs/part_'+val+'.jpg';
        if (val == max) val = 0;
        this.setValue(row, col, val);
        this.setImage(row,col,image);
      }
    }

  }
}

