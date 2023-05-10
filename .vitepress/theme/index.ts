import DefaultTheme from 'vitepress/theme'
import {EnhanceAppContext} from "vitepress";

export default {
    ...DefaultTheme,
    enhanceApp(ctx:EnhanceAppContext) {
        DefaultTheme.enhanceApp(ctx);
        ctx.app.config.globalProperties.$sourceUrl = "https://github.com/fornetcode/fornet"
    }
}