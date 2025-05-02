import { NextResponse } from 'next/server'

// Define service categories with weighted keywords and synonyms
const serviceCategories = {
  home: {
    primary: ['home', 'house', 'repair', 'maintenance', 'renovation'],
    secondary: ['cleaning', 'plumbing', 'electrical', 'interior', 'decor'],
    synonyms: ['residence', 'household', 'domestic', 'property']
  },
  travel: {
    primary: ['travel', 'transport', 'trip', 'journey', 'vacation'],
    secondary: ['car', 'ride', 'transportation', 'driving', 'booking'],
    synonyms: ['holiday', 'tour', 'expedition', 'voyage']
  },
  food: {
    primary: ['food', 'catering', 'meal', 'cuisine', 'restaurant'],
    secondary: ['dining', 'cook', 'chef', 'delivery', 'menu'],
    synonyms: ['gastronomy', 'culinary', 'eating', 'dietary']
  },
  fashion: {
    primary: ['fashion', 'style', 'clothing', 'wardrobe', 'apparel'],
    secondary: ['dress', 'outfit', 'styling', 'accessories', 'design'],
    synonyms: ['attire', 'garments', 'wear', 'couture']
  },
  education: {
    primary: ['education', 'learning', 'study', 'course', 'training'],
    secondary: ['teach', 'tutor', 'school', 'academic', 'knowledge'],
    synonyms: ['instruction', 'teaching', 'coaching', 'mentoring']
  },
  logistics: {
    primary: ['logistics', 'moving', 'shipping', 'transport', 'delivery'],
    secondary: ['relocation', 'storage', 'packing', 'freight', 'cargo'],
    synonyms: ['supply chain', 'distribution', 'warehousing']
  },
  health: {
    primary: ['health', 'wellness', 'fitness', 'medical', 'healthcare'],
    secondary: ['exercise', 'nutrition', 'diet', 'workout', 'therapy'],
    synonyms: ['wellbeing', 'vitality', 'medicine', 'healing']
  },
  'business-development': {
    primary: ['business', 'development', 'digital', 'technology', 'software'],
    secondary: ['web', 'app', 'startup', 'growth', 'innovation'],
    synonyms: ['enterprise', 'commerce', 'corporate', 'tech']
  },
  consulting: {
    primary: ['consulting', 'strategy', 'advisor', 'management', 'planning'],
    secondary: ['business', 'expert', 'guidance', 'solutions', 'analysis'],
    synonyms: ['consultation', 'advisory', 'counseling']
  },
  games: {
    primary: ['games', 'kids', 'children', 'play', 'entertainment'],
    secondary: ['fun', 'educational games', 'toys', 'activities', 'recreation'],
    synonyms: ['gaming', 'amusement', 'pastime', 'leisure']
  }
}

// Calculate Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null))

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      )
    }
  }

  return matrix[b.length][a.length]
}

// Check if two words are similar using fuzzy matching
function areSimilar(word1: string, word2: string, threshold = 0.7): boolean {
  const maxLength = Math.max(word1.length, word2.length)
  const distance = levenshteinDistance(word1, word2)
  const similarity = (maxLength - distance) / maxLength
  return similarity >= threshold
}

function findBestMatches(query: string): Array<{ service: string; relevance: number }> {
  const normalizedQuery = query.toLowerCase().trim()
  const queryWords = normalizedQuery.split(/\s+/)
  
  const scores = Object.entries(serviceCategories).map(([service, keywords]) => {
    let score = 0
    
    queryWords.forEach(queryWord => {
      // Check primary keywords (highest weight)
      keywords.primary.forEach(keyword => {
        if (areSimilar(queryWord, keyword)) score += 3
        if (queryWord === keyword) score += 5
      })
      
      // Check secondary keywords (medium weight)
      keywords.secondary.forEach(keyword => {
        if (areSimilar(queryWord, keyword)) score += 2
        if (queryWord === keyword) score += 3
      })
      
      // Check synonyms (lower weight)
      keywords.synonyms.forEach(synonym => {
        if (areSimilar(queryWord, synonym)) score += 1
        if (queryWord === synonym) score += 2
      })
    })

    // Normalize score based on query length
    const relevance = score / queryWords.length

    return { service, relevance }
  })

  // Sort by relevance and filter out low-scoring matches
  return scores
    .sort((a, b) => b.relevance - a.relevance)
    .filter(item => item.relevance > 0)
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json()
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ 
        error: 'Invalid query. Please provide a text query.',
        status: 'error'
      }, { 
        status: 400 
      })
    }

    if (query.trim().length < 2) {
      return NextResponse.json({
        error: 'Query too short. Please provide a more detailed query.',
        status: 'error'
      }, {
        status: 400
      })
    }

    const suggestions = findBestMatches(query)
    
    return NextResponse.json({
      status: 'success',
      data: {
        suggestions: suggestions.map(s => ({
          service: s.service,
          relevance: Math.round(s.relevance * 100) / 100
        })),
        query: query.trim()
      },
      message: suggestions.length > 0 
        ? 'Services found based on your query' 
        : 'No matching services found. Try using different keywords.'
    })

  } catch (error) {
    console.error('Service suggestion error:', error)
    return NextResponse.json({ 
      error: 'Failed to process request. Please try again.',
      status: 'error'
    }, { 
      status: 500 
    })
  }
}
