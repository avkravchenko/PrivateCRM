export function findMaxAndSort(a, b, order, mode) {
  a.sort((a, b) => {
    return b.startDiff - a.startDiff;
  });

  b.sort((a, b) => {
    return b.startDiff - a.startDiff;
  });

  if (mode === "startsInXDays") {
    let diff = order
      ? a[0].startDiff - b[0].startDiff
      : b[0].startDiff - a[0].startDiff;

    if (diff > 0) return 1;
    if (diff === 0) return 0;
    if (diff < 0) return -1;
  }

  if (mode === "endsToday") {
    a.sort((a, b) => {
      return b.endDiff - a.endDiff;
    });

    b.sort((a, b) => {
      return b.endDiff - a.endDiff;
    });
    if (a[0].endDiff === 0 || a[0].endDiff === 0) return -1;
  }

  if (mode === "endsTomorrow") {
    a.sort((a, b) => {
      return b.endDiff - a.endDiff;
    });

    b.sort((a, b) => {
      return b.endDiff - a.endDiff;
    });
    if (a[a.length - 1].endDiff === 1 || a[a.length - 1].endDiff === 1)
      return -1;
  }

  if (mode === "endsInXDays") {
    a.sort((a, b) => {
      return b.endDiff - a.endDiff;
    });

    b.sort((a, b) => {
      return b.endDiff - a.endDiff;
    });

    let diff = order
      ? a[0].endDiff - b[0].endDiff
      : b[0].endDiff - a[0].endDiff;

    return diff;
  }

  if (mode === "endedXDaysAgo") {
    a.sort((a, b) => {
      return b.endDiff - a.endDiff;
    });

    b.sort((a, b) => {
      return b.endDiff - a.endDiff;
    });

    let diff = order
      ? b[0].endDiff - a[0].endDiff
      : a[0].endDiff - b[0].endDiff;

    return diff;
  }
}
