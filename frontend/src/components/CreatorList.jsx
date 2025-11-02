import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CreatorCard from './CreatorCard';
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { setSelectedCreator,setCreators } from '../store/slices/creatorsSlice';
import { fetchCreatorList } from '../store/thunks/creatorThunk';
export default function CreatorList() {
  const dispatch = useDispatch();
  const { creators, loading, error } = useSelector((state) => state.creators);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [localLoading, setLocalLoading] = useState(false);
  const [sortsBy, setSortBy] = useState('');

  const selectedCategory = useMemo(() => {
    return searchParams.get('category') || 'all';
  }, [searchParams]);

  const currentPage = useMemo(() => {
    return parseInt(searchParams.get('page')) || 1;
  }, [searchParams]);

  // Fetch creators filters
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, searchTerm, selectedCategory, currentPage]);

  useEffect(() => {
    if (sortsBy === 'asd') {
      console.log('creators', creators);
      const filterData = [...creators].sort((a, b) => a.followerCount - b.followerCount);
      console.log('filterData', filterData);
      dispatch(setCreators(filterData));
    } else if (sortsBy === 'dse') {
      const filterData = [...creators].sort((a, b) => b.followerCount - a.followerCount);
      console.log('filterData', filterData);
      dispatch(setCreators(filterData));
    } else {
      fetchData();
    }
  }, [sortsBy]);

  const fetchData = async () => {
    setLocalLoading(true);
    const params = {
      page: currentPage,
      limit: 9,
      ...(searchTerm && { search: searchTerm }),
      ...(selectedCategory !== 'all' && { category: selectedCategory }),
    };

    try {
      await dispatch(fetchCreatorList(params));
    } catch (error) {
      console.error('Failed to fetch creators:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', category);
    }
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (newPage) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = useMemo(() => {
    const cats = new Set(creators.map((c) => c.category));
    return Array.from(cats).sort();
  }, [creators]);

  const paginationInfo = {
    currentPage,
    totalPages: Math.ceil(creators.length / 9),
    hasNext: currentPage < Math.ceil(creators.length / 9),
    hasPrev: currentPage > 1,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Discover Creators
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Find and manage talented creators in your network
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, skill, or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            disabled={localLoading}
          />
          {localLoading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
        <div>
          <span>Sort By: </span>
          <select onChange={(e) => setSortBy(e.target.value)} className="border p-2">
            <option value="">select sort by</option>
            <option value="asd">Asending</option>
            <option value="dse">Desending</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <button
            onClick={() => handleCategoryChange('all')}
            disabled={localLoading}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-500'
            } ${localLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              disabled={localLoading}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-600 dark:bg-blue-700 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-500'
              } ${localLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {(localLoading || loading) && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Results */}
      {!localLoading && !loading && creators.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No creators found. Try adjusting your filters or search term.
          </p>
        </div>
      ) : (
        !localLoading &&
        !loading && (
          <>
            {/* Grid/List View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creators.map((creator) => (
                <CreatorCard
                  key={creator.id || creator._id}
                  creator={creator}
                  onViewDetails={(creator) => dispatch(setSelectedCreator(creator))}
                />
              ))}
            </div>

            {/* Pagination */}
            {paginationInfo.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!paginationInfo.hasPrev || localLoading}
                  className={`p-2 rounded-lg border border-gray-300 dark:border-gray-600 ${
                    !paginationInfo.hasPrev || localLoading
                      ? 'opacity-50 cursor-not-allowed text-gray-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {paginationInfo.totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!paginationInfo.hasNext || localLoading}
                  className={`p-2 rounded-lg border border-gray-300 dark:border-gray-600 ${
                    !paginationInfo.hasNext || localLoading
                      ? 'opacity-50 cursor-not-allowed text-gray-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
}
