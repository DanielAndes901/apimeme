import { environment } from 'src/environments/environment';


export const getThemeColor = () => {
    let color = environment.defaultColor;
    try {
        color = localStorage.getItem(environment.themeColorStorageKey) || environment.defaultColor
    } catch (error) {
        console.log(">>>> src/app/utils/util.js : getThemeColor -> error", error)
        color = environment.defaultColor
    }
    return color;
}
export const setThemeColor = (color : any) => {
    try {
        if (color) {
            localStorage.setItem(environment.themeColorStorageKey, color);
        } else {
            localStorage.removeItem(environment.themeColorStorageKey)
        }
    } catch (error) {
        console.log(">>>> src/app/utils/util.js : setThemeColor -> error", error)
    }
}
export const getThemeRadius = () => {
    let radius = 'rounded';
    try {
        radius = localStorage.getItem(environment.themeRadiusStorageKey) || 'rounded';
    } catch (error) {
        console.log(">>>> src/app/utils/util.js : getThemeRadius -> error", error)
        radius = 'rounded'
    }
    return radius;
}
export const setThemeRadius = (radius : any) => {
    try {
        localStorage.setItem(environment.themeRadiusStorageKey, radius);
    } catch (error) {
        console.log(">>>> src/app/utils/util.js : setThemeRadius -> error", error)
    }
}

export const getThemeLang = () => {
    let lang = 'en';
    try {
        lang = localStorage.getItem('theme_lang') || 'en';
    } catch (error) {
        console.log(">>>> src/app/utils/util.js : getThemeLang -> error", error)
        lang = 'en'
    }
    return lang;
}
export const setThemeLang = (lang : any) => {
    try {
        localStorage.setItem('theme_lang', lang);
    } catch (error) {
        console.log(">>>> src/app/utils/util.js : setThemeLang -> error", lang)
    }
}

export const getUserRole = () => {
  let role : any = environment.defaultRole;
  try {
      role = localStorage.getItem('theme_user_role') || environment.defaultRole;
  } catch (error) {
      console.log(">>>> src/app/utils/util.js : getUserRole -> error", error)
      role = environment.defaultRole
  }
  return role;
}
export const setUserRole = (role : any) => {
  try {
      localStorage.setItem('theme_user_role', role);
  } catch (error) {
      console.log(">>>> src/app/utils/util.js : setUserRole -> error", role)
  }
}
