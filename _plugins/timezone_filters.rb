# frozen_string_literal: true

require "time"

# Liquid filter for turning a naive "YYYY-MM-DD HH:MM" datetime string (as
# used in event `dates:` front matter, and in the hand-written `data-date`
# attributes on ticket buttons) into a fully-qualified ISO 8601 string with
# the correct UTC offset for *that specific date*, given an IANA timezone
# name (e.g. "America/Chicago").
#
# Why this exists rather than a hardcoded "-05:00"/"-06:00": a fixed offset
# is only correct for half the year -- St. Louis (America/Chicago) is
# -05:00 (CDT) roughly March-November and -06:00 (CST) the rest of the
# year, and the exact switchover date changes annually (US DST rules:
# second Sunday in March to first Sunday in November). Resolving the
# correct offset per-date via the IANA tz database means this never needs
# manual correction for a future event, whatever time of year it falls in,
# and correctly supports events at venues in other timezones too (just set
# a different `timezone:` in that event's front matter).
#
# Implementation note: this uses Ruby's own Time.local + ENV["TZ"], not the
# `tzinfo` gem (not a project dependency) -- Time.local resolves against
# the system's zoneinfo database when TZ is set, which every reasonable
# Jekyll build host has (macOS, Linux, and GitHub Actions' ubuntu-latest
# runners all ship one). Restores the previous ENV["TZ"] afterward so this
# doesn't leak into any other date handling during the same build (Jekyll's
# own site-wide `timezone:` config, for instance).
module Jekyll
  module TimezoneFilters
    def to_iso8601(date_str, tz_name)
      return "" if date_str.nil? || date_str.to_s.strip.empty?
      return date_str if tz_name.nil? || tz_name.to_s.strip.empty?

      match = date_str.to_s.match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/)
      return date_str unless match

      year, month, day, hour, minute = match.captures.map(&:to_i)

      previous_tz = ENV["TZ"]
      begin
        ENV["TZ"] = tz_name.to_s
        Time.local(year, month, day, hour, minute, 0).iso8601
      ensure
        ENV["TZ"] = previous_tz
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::TimezoneFilters)
