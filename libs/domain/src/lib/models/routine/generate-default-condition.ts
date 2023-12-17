export const generateDefaultCondition = ()  => {
    const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      );

      return {
        activated: true,
        activeDays: [0, 1, 2, 3, 4, 5, 6],
        activatedBetween: {
          dateEnd: todayEnd.getTime(),
          dateIni: today.getTime(),
        },
        suppressFor: 5,
      };
  }