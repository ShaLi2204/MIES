

const schema = {

    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
    },

    /* The time at which the survey response is public */
    createdAt: {
        type: Date,
        optional: true,
        canRead: ['guests'],
        onCreate: () => {
            return new Date();
        }
    },

    /*
        The survey responses's status. 
    */
    status: {
        type: Number,
        optional: true,
        canRead: ['guests'],
        canCreate: ['admins'],
        canUpdate: ['admins'],
        input: 'select',
        onCreate: ({newDocument: document, currentUser}) => {
        if (!document.status) {
            return getCollection('Surveys').getDefaultStatus(currentUser);
        }
        },
        onUpdate: ({data, currentUser}) => {
        // if for some reason post status has been removed, give it default status
        if (data.status === null) {
            return getCollection('Surveys').getDefaultStatus(currentUser);
        }
        },
        options: () => getCollection('Surveys').statuses,
        /*group: formGroups.admin*/
    }, 
        /* The survey author's name */
    author: {
        type: String,
        optional: true,
        canRead: ['guests'],
        onUpdate: ({data}) => {
        // if userId is changing, change the author name too
        if (data.userId) {
            return Users.getDisplayNameById(data.userId)
        }
        }
    },
    /* The survey author's `_id`. */
    userId: {
        type: String,
        optional: true,
        input: 'select',
        canRead: ['guests'],
        canCreate: ['members'],
        hidden: true,
        resolveAs: {
        fieldName: 'user',
        type: 'User',
        resolver: async (survey, args, context) => {
            if (!survey.userId) return null;
            const user = await context.Users.loader.load(survey.userId);
            return context.Users.restrictViewableFields(context.currentUser, context.Users, user);
        },
        addOriginalField: true
        },
    },
     /* The survey author's name */
     author: {
        type: String,
        optional: true,
        canRead: ['guests'],
        onUpdate: ({data}) => {
        // if userId is changing, change the author name too
        if (data.userId) {
            return Users.getDisplayNameById(data.userId)
        }
        }
    },
    /* The survey author's `_id`. */
    userId: {
        type: String,
        optional: true,
        input: 'select',
        canRead: ['guests'],
        canCreate: ['members'],
        hidden: true,
        resolveAs: {
        fieldName: 'user',
        type: 'User',
        resolver: async (survey, args, context) => {
            if (!survey.userId) return null;
            const user = await context.Users.loader.load(survey.userId);
            return context.Users.restrictViewableFields(context.currentUser, context.Users, user);
        },
        addOriginalField: true
        },
    },
   /* TODO: SurveyItemDefinitions */ 
   /* Surveyid */
}
