const stringifyDate = (startDate) => {
    const options = {day: 'numeric', month : 'short' , year : 'numeric'};

        const newDate = !this.startDate ? "undefined":
                        new Date(Date.parse(startDate)).toLocaleDateString("en-GB",options);
}