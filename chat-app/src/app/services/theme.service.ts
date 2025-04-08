import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themes = [
    {
      background: "#1A1A2E",
      color: "#FFFFFF",
      primaryColor: "#0F3460",
      glassColor: "rgba(255, 255, 255, 0.1)"
    },
    {
      background: "#461220",
      color: "#FFFFFF",
      primaryColor: "#E94560",
      glassColor: "rgba(255, 255, 255, 0.1)"
    },
    {
      background: "#192A51",
      color: "#FFFFFF",
      primaryColor: "#967AA1",
      glassColor: "rgba(255, 255, 255, 0.1)"
    },
    {
      background: "#F7B267",
      color: "#000000",
      primaryColor: "#F4845F",
      glassColor: "rgba(0, 0, 0, 0.1)"
    },
    {
      background: "#F25F5C",
      color: "#000000",
      primaryColor: "#642B36",
      glassColor: "rgba(0, 0, 0, 0.1)"
    },
    {
      background: "#231F20",
      color: "#FFF",
      primaryColor: "#BB4430",
      glassColor: "rgba(255, 255, 255, 0.1)"
    }
  ];

  setTheme(theme: any) {
    const root = document.documentElement;
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--color', theme.color);
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--glass-color', theme.glassColor);
  }
}
