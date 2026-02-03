export function createRateLimiter({windowMs, maxRequests, message}) {
    const requestTracker = {}
    
    return (req, res, next) => {
        const ip = req.ip
        const now = Date.now()
        
        if(!requestTracker[ip]) {
            requestTracker[ip] = []
        }
        
        requestTracker[ip] = requestTracker[ip].filter(timestamp => now - timestamp <= windowMs)
        
        if(requestTracker[ip].length >= maxRequests) {
            return res.status(429).json({error: message})
        }
        
        requestTracker[ip].push(now)
        next()
    }
}

export const apiRateLimiter = createRateLimiter({
    windowMs: 60000,
    maxRequests: 100,
    message: "Too many requests"
})