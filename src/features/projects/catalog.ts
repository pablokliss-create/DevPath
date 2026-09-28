export type ProjectStudy={id:string;level:'beginner'|'intermediate'|'advanced';concepts:string[];description:{ptBR:string;en:string};path:string};
export const projectStudies:ProjectStudy[]=[
{id:'rei-da-limonada-rio',level:'beginner',concepts:['variables','functions','DOM','state'],path:'rei-da-limonada-rio/game.js',description:{ptBR:'Jogo em JavaScript puro para enxergar estado, eventos e funções em código real.',en:'Vanilla JavaScript game for seeing state, events, and functions in real code.'}},
{id:'painel-controle',level:'intermediate',concepts:['TypeScript','React Native','mobile'],path:'painel-controle/package.json',description:{ptBR:'Projeto mobile para estudar TypeScript, navegação e persistência no aparelho.',en:'Mobile project for studying TypeScript, navigation, and device persistence.'}},
{id:'discord-server-bot',level:'intermediate',concepts:['Node.js','events','bots'],path:'discord-server-bot/package.json',description:{ptBR:'Bot orientado a eventos para ligar JavaScript moderno a automações reais.',en:'Event-driven bot connecting modern JavaScript to real automation.'}},
{id:'roblox-fps-pvp',level:'advanced',concepts:['client/server','authority','persistence'],path:'roblox-fps-pvp/README.md',description:{ptBR:'FPS Roblox para estudar autoridade do servidor, serviços e persistência.',en:'Roblox FPS for studying server authority, services, and persistence.'}},
];
