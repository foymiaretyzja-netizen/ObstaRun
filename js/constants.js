// js/constants.js

export const GRID_SIZE = 30;

// Physics constants
export const GRAVITY = 0.6;
export const FRICTION = 0.8;
export const JUMP_POWER = -14;
export const LAUNCH_POWER = -22; 
export const ZERO_G_ACCEL = 0.6; 

// Health & Hazard damage profiles
export const SPIKE_DAMAGE = 20;
export const SPIKE_DAMAGE_COOLDOWN = 200; // 0.2 seconds
export const KILLBRICK_DAMAGE = 5; 
export const KILLBRICK_DAMAGE_COOLDOWN = 200; 
export const MACE_DAMAGE = 35;
export const MACE_KNOCKBACK = 10;
export const AXE_DAMAGE = 25; 
export const AXE_KNOCKBACK = 15;
export const FALLING_BLOCK_DAMAGE = 50; 
export const GRABBER_DAMAGE = 5; 
export const GRABBER_DAMAGE_COOLDOWN = 200; 
export const LASER_ENEMY_DAMAGE = 25; 
export const LASER_ENEMY_DAMAGE_COOLDOWN = 500; 
export const LASER_PROJECTILE_DAMAGE = 15; 
export const SPINNER_DAMAGE = 45; 
export const SPINNER_DAMAGE_COOLDOWN = 500;
export const BULL_DAMAGE = 50;
export const BULL_KNOCKBACK = 25;
export const PUNCHER_DAMAGE = 25;
export const PUNCHER_DAMAGE_COOLDOWN = 500;
export const FALLING_SPIKE_DAMAGE = 50;
export const ROLLING_BALL_DAMAGE = 10; 
export const CANNON_BALL_DAMAGE = 45;
export const LASER_GATE_DAMAGE = 35;
export const LASER_GATE_COOLDOWN = 200;
export const ARROW_TRAP_DAMAGE = 35;
export const HEAL_ORB_VALUE = 25;
export const MEDKIT_HEAL_VALUE = 100;
export const BOSS_BULLET_DAMAGE = 10;

// Passive regeneration profiles
export const HEAL_DELAY = 5000; // 5 seconds before healing starts
export const HEAL_RATE = 5;
export const HEAL_INTERVAL = 2500; // 2.5 seconds per tick
