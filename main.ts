/**
 * 0x27 = 39 en décimale
 */
/**
 * Lors de l'acquisition, on affiche le temps depuis le début de l'acquisition en minutes
 */
/**
 * Quand on démarre l'acquisition, on part d'un log vide et on remet remet nos compteurs à 0. Ça n'affecte pas les timestamps du microbit pour la saisie de données.
 */
/**
 * Fin de l'acquisition
 */
/**
 * Donnée initiale
 */
input.onButtonPressed(Button.A, function () {
    if (!(actif)) {
        datalogger.deleteLog()
        actif = true
        debutDelai = control.millis()
        debutAcquisition = control.millis()
        datalogger.log(datalogger.createCV("T", temperature))
    }
})
input.onButtonPressed(Button.B, function () {
    actif = false
})
let delai = 0
let temperature = 0
let debutAcquisition = 0
let debutDelai = 0
let actif = false
actif = false
debutDelai = 0
debutAcquisition = 0
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
datalogger.setColumnTitles("T")
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.clear()
/**
 * Actif = si l'aquisition est en cours
 * 
 * debutDelai = permet de compter le délai entre les acquisitions
 * 
 * Debut Acquisition = permet d'afficher le debut
 */
/**
 * Lecture de la probe branchée sur P0
 */
/**
 * On utilise millis() au lieu des délais pour ne pas bloquer le microbit.
 * 
 * Présentement on prend une mesure à chaque 30 secondes
 */
/**
 * Permet un affichage de la température en temps réel sur la 2e ligne de l'écran. On limite à 2 décimales
 */
/**
 * ASCII pour °
 */
/**
 * On prend une mesure à toutes les 30 secondes
 */
basic.forever(function () {
    temperature = dstemp.celsius(DigitalPin.P0)
    delai = control.millis() - debutDelai
    I2C_LCD1602.ShowString("T = ", 0, 1)
    I2C_LCD1602.ShowString(convertToText(temperature).substr(0, 5), 4, 1)
    I2C_LCD1602.ShowString(String.fromCharCode(223), 9, 1)
    I2C_LCD1602.ShowString("C", 10, 1)
    if (actif) {
        I2C_LCD1602.ShowString("En cours t=", 0, 0)
        I2C_LCD1602.ShowString(convertToText(Math.idiv(control.millis() - debutAcquisition, 60000)), 11, 0)
        I2C_LCD1602.ShowString("min", 13, 0)
        if (delai > 30000) {
            datalogger.log(datalogger.createCV("T", temperature))
            debutDelai = control.millis()
        }
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
        I2C_LCD1602.ShowString("N'enregistre pas", 0, 0)
    }
})
