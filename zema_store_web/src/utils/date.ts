const date = {
  filter(d: any) {
    let options = { year: "numeric", month: "long", day: "numeric" };
    let val = d.toLocaleDateString("en-US", options);
    return val;
  },
  format(d: any) {
    let order = date.setOrder(parseInt(d.getDate()));

    return `${d.toLocaleString("en-us", {
      weekday: "short",
    })},${d.toLocaleString("en-us", {
      month: "short",
    })} ${d.getDate()} ${order}`;
  },

  setOrder(day: any) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
};

export default date;
