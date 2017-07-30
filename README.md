# COLORIFY JS Plugin
=====================

# Author: Sagar Dewani

### Official Website : [HetroTech](http://hetrotech.in/)

### Official Email:[info@hetrotech.in](mailto:info@hetrotech.in?subject=Support)

### Personal Email:[sagar7930@gmail.com](mailto:sagar7930@gmail.com?subject=colorify%20support)

### Facebook : [Sagar Dewani](https://www.facebook.com/sagar.dev.1426)

### LinkedIn: [Sagar Dewani](https://linkedin.com/in/sagar-kumar-3420a1b2)

1.  Colorify JS Plugin is a jQuery and Javascript based plugin to
    dynamically set background, foreground, text formatting.

2.  This plugin comes with many handy features that are just one press
    away from you. Just press the command keys and see the magic
    of plugin.

3.  This plugin is intended to apply text formatting effects on the
    element to view how your layout will look after applying
    these effects. However the effects are temporary and get removed as
    soon as you refresh the page. This is only to show you how your
    layout will look not to set your layout permanently. You must need
    to add the HTML code or CSS to make the effects permanent.

4.  This plugin is for testing before implementing your CSS styles
    into HTML. For actual effect you must copy the CSS code or HTML code
    generated and paste it in your HTML file.

5.  Now, this plugin is not compatible with mobile browser versions and
    touch devices.

 ***HOW TO SETUP***

 To setup Colorify plugin for your project you should include the
 following plugins as dependency in your project before including this
 plugin:

 The plugin is tested with mentioned dependencies:

-   jQuery 3.x

-   Bootstrap 3.7.x

-   jQuery UI 1.11.x

-   font-awesome 4.7.x


- After including all these dependencies insert Colorify plugin javascript file in your project using


 ```javascript 
       <script type="text/javascript" src="jquery.colorify.min.js"></script>
 ```

 ***HOW TO USE***
 
Include this javascript code in your HTML layout ```$.colorify();``` or
 ```$.colorify({options});```
```javascript
	$.colorify();
```


**You can also change the triggering key combination**

***HOW TO CHANGE DEFAULT OPTIONS***:

| # | Option  | Description                                                         | Usage Example                 |
|--------|-------------|-------------------------------------------------------------------------|-----------------------------------|
| 1      | colorifyKey | To change the key combination of turn on/off the colorify mode.**** | *$.colorify({colorifyKey:’66’});* |
| 2      | sourceKey   | To change the key combination of the source code generator.****     | *$.colorify({sourceKey:’66’});*   |
| 3      | modeKey     | To change the key combination of turn on/off the mode.****          | *$.colorify({modeKey:’66’});*     |


*****Note: You cannot set or change control keys with the key
combination (shift,ctrl,alt).

***HOW TO APPLY EFFECTS***:

-   Select the element on which you want to apply effects.

-   Then, turn on the colorify mode. Press *shift+c(To check which mode
    is applied Press ctrl+m)*.

| **#** | **Effect**     | **#Mode Name** | **#Key Combination** | **Description**                                                                                       | **Usage Example** |
|--------|----------------|-----------------|-----------------------|-------------------------------------------------------------------------------------------------------|-------------------|
| 1      | -              | Colorify        | Shift+c               | To turn on/off the colorify mode.                                                                     | -                 |
| 2      | -              | Font            | Shift+t               | To turn on/off the font mode. \*\*\*                                                                  | -                 |
| 3      | Set Background | Bgcolor         | Shift+b               | To turn on/off the bgcolor mode.\*\*\*                                                                  Then select any color from color pallet to set the color as background color of the selected element.  | -                 |
| 4      | Set Foreground | Fgcolor         | Shift+f               | To turn on/off the fgcolor mode.\*\*\*                                                                Then select any color from color pallet to set the color as foreground color of the selected element.  | -                 |
| 5      | Letter Spacing | Font            | Left Arrow Key        | To decrease letter spacing of text of selected element.                                               | -                 |
| 6      | Letter Spacing | Font            | Right Arrow Key       | To increase letter spacing of text of selected element.                                               | -                 |
| 7      | Font Size      | Font            | Up Arrow Key          | To decrease text font size of selected element.                                                       | -                 |
| 8      | Font Size      | Font            | Down Arrow Key        | To increase text font size of selected element.                                                       | -                 |
| 9      | Bold           | Font            | Ctrl+b                | To bold/normal the selected element text.                                                             | -                 |

***KEY COMBINATIONS***:

| \#  | \#Key Combination | Description                                                                                                                                                                                     |
|-----|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1   | *Shift+c*         | Select the element and press the key combination to turn on/off the colorify mode. \*\*                                                                                                         |
| 2   | *Ctrl+m*          | Select the element and press the key combination to check which mode is currently active. \*\*                                                                                                  |
| 3   | *Shift+Ctrl+Alt*  | Select the element and press the key combination to go back to normal mode. \*\*                                                                                                                |
| 4   | *Enter*           | Select the element and press the key combination to get the CSS code of element that has been applied using this plugin or inline CSS code. \*\*                                                |
| 5   | *Shift+b*         | Select the element and press the key combination to set the **background** and choose color from color pallet or you can enter your custom color HEX value to apply on selected element. \*\*\* |
| 6   | *Shift+f*         | Select the element and press the key combination to set the **foreground** and choose color from color pallet or you can enter your custom color HEX value to apply on selected element. \*\*\* |
| 7   | *Shift+t*         | Select the element and press the key combination to apply text formatting on selected element. \*\*\*    
| 8   | *Ctrl+b*          | Select the element and press the key combination to apply/remove bold effect on selected element. You need to be in font mode to use this. \*\*\*   


***

| **ArrowKeys**   | **Functioning**                          |                                                                                                                                     
|-----------------|------------------------------------------|                                                                                                                                     
| Right Arrow Key | To increase the letter spacing. Max: 100 |                                                                                                                                     
|  Left Arrow Key | To decrease the letter spacing. Min: 0   |                                                                                                                                     
| Up Arrow Key    | To decrease the font size.               |                                                                                                                                     
| Down Arrow Key  | To increase the font size.               |                                                         

\*\**Note: Please make sure that you select the element again after
on/off the mode to update the configuration otherwise previous
configuration may be retained.*

*\*\*\*Note: Please turn on the colorify mode first to use effect.*

***Support:***

If you find any kind of bug or want to give suggestions or want to team
with us. Email us at listed emails above.
