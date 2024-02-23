/**
 * The plugin initialization function, which will receive the Formio interface as its first argument.
 */
export interface PluginInitFunction {
    /**
     * @param Formio - The Formio interface class.
     */
    (Formio: any): void;
}
/**
 * Function that is called when the plugin is deregistered.
 */
export interface PluginDeregisterFunction {
    /**
     * @param Formio The Formio interface class.
     */
    (Formio: any): void;
}
/**
 * A Formio Plugin interface.
 */
export interface Plugin {
    /**
     * The name of the plugin.
     */
    __name: string;
    /**
     * The priority of this plugin.
     */
    priority: number;
    /**
     * An initialization function called when registered with Formio.
     */
    init: PluginInitFunction;
    /**
     * Called when the plugin is deregistered.
     */
    deregister: PluginDeregisterFunction;
}
/**
 * The Form.io Plugins allow external systems to "hook" into the default behaviors of the JavaScript SDK.
 */
export default class Plugins {
    /**
     * An array of Form.io Plugins.
     */
    static plugins: Array<Plugin>;
    /**
     * The Formio class.
     */
    static Formio: any;
    /**
     * Returns the plugin identity.
     *
     * @param value
     */
    static identity(value: string): string;
    /**
     * De-registers a plugin.
     * @param plugin The plugin you wish to deregister.
     */
    static deregisterPlugin(plugin: (Plugin | string)): boolean;
    /**
     * Registers a new plugin.
     *
     * @param plugin The Plugin object.
     * @param name The name of the plugin you wish to register.
     */
    static registerPlugin(plugin: Plugin, name: string): void;
    /**
     * Returns a plugin provided the name of the plugin.
     * @param name The name of the plugin you would like to get.
     */
    static getPlugin(name: string): Plugin | null;
    /**
     * Wait for a plugin function to complete.
     * @param pluginFn - A function within the plugin.
     * @param args
     */
    static pluginWait(pluginFn: any, ...args: any[]): Promise<any[]>;
    /**
     * Gets a value from a Plugin
     * @param pluginFn
     * @param args
     */
    static pluginGet(pluginFn: any, ...args: any[]): any;
    /**
     * Allows a Plugin to alter the behavior of the JavaScript library.
     *
     * @param pluginFn
     * @param value
     * @param args
     */
    static pluginAlter(pluginFn: any, value: any, ...args: any[]): any;
}
