class Time {
    days: number
    hours: number
    minutes: number

    constructor() {
        this.days = 0
        this.hours = 0
        this.minutes = 0
    }

    // These functions handle changing the clock.
    // Right now there is no day counter.

    increment() {
        this.minutes++
        if (this.minutes >= 60) {
            this.minutes -= 60
            this.hours++
        }
        if (this.hours >= 24) {
            this.hours -= 24
            this.days++
        }
    }
}

export { Time }
