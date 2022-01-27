const clsattendrategrp = {
    "grp1": 0.05,
    "grp2": 0.20,
    "grp3": 0.75,
    "grp1count": 15
}

const clsteacher = [
    {"class_id": 1, "school_id": 1, "studnum": 5},
    {"class_id": 2, "school_id": 1, "studnum": 3},
    {"class_id": 3, "school_id": 1, "studnum": 4},
    {"class_id": 4, "school_id": 1, "studnum": 1}
]

const contentteacher = {
    "draft": 1,
    "published": 32,
    "pending": 12,
    "rejected": 1,
    "total": 46
}

const pendingassignment = [
    {"class_type" : "class", "count" : 30},
    {"class_type" : "live", "count" : 120},
    {"class_type" : "homework", "count" : 5},
    {"class_type" : "study", "count" : 20}
]

const reports = {
    CLASS_ATTENDANCE_RATE_GROUP: `clsattendrategrp`,
    CLASS_TEACHER: `clsteacher`,
    CONTENT_TEACHER: `contentteacher`,
    PENDING_ASSIGNMENT: `pendingassignment`,
};

export const endpoint = (event, context, callback) => {

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        body: ""
    };

    try {
        const { repid } = event.queryStringParameters;

        const now = Date.now();
        const thirtyMinutes = 1000 * 60 * 30;
        const expiryTime = Date.now() + thirtyMinutes;
    
        const baseResponse = {
            lastupdate: Math.floor(now / 1000),
            info: "",
            expiry: Math.floor(expiryTime / 1000),
            successful: true
        };
    
        if(!repid) {
            response.statusCode = 400,
            response.body = "invalid request"
        } else {

            if(repid === reports.CLASS_ATTENDANCE_RATE_GROUP) baseResponse.info = clsattendrategrp
            if(repid === reports.CLASS_TEACHER) baseResponse.info = clsteacher
            if(repid === reports.CONTENT_TEACHER) baseResponse.info = contentteacher
            if(repid === reports.PENDING_ASSIGNMENT) baseResponse.info = pendingassignment

            response.body = JSON.stringify(baseResponse);
        }
    } catch (e) {
        response.statusCode = 500
        response.body = "Internal server error"
    }
    callback(null, response)
}