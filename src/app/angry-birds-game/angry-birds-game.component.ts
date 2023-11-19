import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as p5 from 'p5';
import * as Matter from 'matter-js';

@Component({
  selector: 'app-angry-birds-game',
  templateUrl: './angry-birds-game.component.html',
  styleUrls: ['./angry-birds-game.component.css']
})
export class AngryBirdsGameComponent implements OnInit, OnDestroy {
  private p5: any;
  private engine: any;
  private world: any;
  private ground: any; // Definimos ground aquí para tenerlo accesible en todo el componente

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createCanvas();
  }

  ngOnDestroy() {
    if (this.p5) {
      this.p5.remove();
    }
    if (this.engine) {
      Matter.Engine.clear(this.engine);
    }
  }

  private createCanvas() {
    this.p5 = new p5((p: any) => {
      p.setup = () => {
        p.createCanvas(800, 600);
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;

        // Ahora ground es una propiedad de la clase y se puede acceder desde cualquier método
        this.ground = Matter.Bodies.rectangle(400, 580, 810, 60, { isStatic: true });
        Matter.World.add(this.world, this.ground);
      };

      p.draw = () => {
        p.background(200);
        Matter.Engine.update(this.engine);

        // Usamos this.ground para acceder a la propiedad de la clase
        p.fill(128);
        p.rectMode(p.CENTER);
        p.rect(this.ground.position.x, this.ground.position.y, 810, 60);
      };

      // Otros métodos de p5.js...
    }, this.el.nativeElement);
  }
}
